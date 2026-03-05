'use client'
import { FingerPrintAnimationIcon } from '@/components/Display/Icons/FingerPrintAnimation'
import { Modal } from '@/components/Display/Modal'
import { PrimaryButton } from '@/components/Inputs/Button/Primary'
import { Paginations } from '@/components/Navigation/Paginations'
import { Skeleton } from '@/components/ui/skeleton'
import { collaboratorSearchBiometrics } from '@/services/Collaborator'
import { getEvent, getEventsByCollaborator, withdrawnEvent } from '@/services/Event'
import { IdentifyBiometrics } from '@/services/iDBio'
import { calcDaysRemaining } from '@/utils/cal-days-remaining'
import { calcPages } from '@/utils/calc-pages'
import { timestampToDate } from '@/utils/timestamp-to-date'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Image from "next/image"
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { ToastError } from '../../Toast/Error'
import { ToastSuccess } from '../../Toast/Success'

type EventEquipment = {
	event: string | null;
	uuid: string | null;
	name: string | null;
	quantity: string | null;
	picture: string | null;
	withdrawn: boolean;
	order: number | null;
};

type RoutineEquipment = {
	id: string | null;
	equipments: EventEquipment[];
};

type Event = {
	uuid: string | null;
	collaborator: string | null;
	collaborator_name: string | null;
	withdrawn: boolean;
	expected_withdrawl_at: Date;
	withdrawl_at: Date | null;
	paused: boolean;
	resumed_at: Date | null;
	created_at: Date;
	updated_at: Date | null;
	routines: RoutineEquipment[];
	days_remaining: number;
};

type Equipment = {
	uuid: string | null;
	company: string | null;
	routine: string | null;
	collaborator: string | null;
	collaborator_name: string | null;
	equipment: string | null;
	equipment_name: string | null;
	equipment_picture: string | null;
	quantity: string | null;
	withdrawn: boolean;
	expected_withdrawl_at: Date;
	withdrawl_at: Date | null;
	paused: boolean;
	resumed_at: Date | null;
	created_at: Date;
	updated_at: Date | null;
	order: number | null;
};

const tabs = ["WITHDRAWAL", "OVERDUE", "ALL"] as const;

type BiometricsTakeoutProps = {
  title: string
  isModalOpen: boolean
  handleClickOverlay: () => void
}

export function BiometricsTakeout({
  title,
  isModalOpen,
  handleClickOverlay,
}: BiometricsTakeoutProps) {
  const [loading, setLoading] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [showEvents, setShowEvents] = useState(false)

  const [modalStatus, setModalStatus] = useState(false);
  const [modalDeleteStatus, setModalDeleteStatus] = useState(false);
  const [needApproval, setNeedApproval] = useState(true);
  const [equipmentsGrouped, setEquipmentsGrouped] = useState<Event[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Event>();
  const [hasPermission, setHasPermission] = useState(true);
  const [loadingEvent, setLoadingEvent] = useState(false);

  const totalEquipments =
    selectedEquipment?.routines.reduce((sum, routine) => {
      return sum + routine.equipments.length;
    }, 0) ?? 0;

  const handleCloseModal = useCallback(() => {
    setModalStatus((prev) => !prev);
  }, []);

  const handleModal = async (equipment: Event) => {
    const now = new Date();
    setSelectedEquipment(equipment);
    setNeedApproval(true);

    if (new Date(equipment.expected_withdrawl_at) > now) {
      if (equipment.uuid) {
        await fetchEvent(equipment.uuid);
      }
    } else {
      setNeedApproval(false);
    }

    //handleCloseModal();
  };

  const handleCloseModalDelete = useCallback(() => {
    setModalDeleteStatus((prev) => !prev);
  }, []);

  const handleCloseModalDeleteGetOut = useCallback(() => {
    //handleCloseModal();
    setModalDeleteStatus((prev) => !prev);
  }, []);

  const handleWithdrawnsEvent = async () => {
    if (!selectedEquipment) return;

    const itemsToWithdraw: { eventId: string; equipmentUuid: string }[] = [];

    selectedEquipment.routines?.forEach((routine) => {
      routine.equipments?.forEach((equip) => {
        if (!equip.withdrawn && equip.event) {
          itemsToWithdraw.push({
            eventId: equip.event,
            equipmentUuid: equip.uuid || "",
          });
        }
      });
    });

    if (itemsToWithdraw.length === 0) return;

    const promises = itemsToWithdraw.map(async (item) => {
      try {
        const response = await withdrawnEvent({
          loading: setLoading,
          id: item.eventId,
        });
        
        return {
          uuid: item.equipmentUuid,
          status: response?.status,
          success: response?.status === 204
        };
      } catch (error) {
        return { uuid: item.equipmentUuid, status: 500, success: false };
      }
    });

    const results = await Promise.all(promises);

    const successfulUUIDs = results
      .filter((res) => res.success)
      .map((res) => res.uuid);

    const hasAnySuccess = successfulUUIDs.length > 0;
    const hasAnyForbidden = results.some((res) => res.status === 403);


    if (successfulUUIDs.length === selectedEquipment.routines[0]?.equipments.length) {
      setModalStatus(false)
    }

    if (hasAnySuccess) {
      setSelectedEquipment((prev) => {
        if (!prev) return undefined;

        const updatedRoutines = prev.routines.map((routine) => {
          const hasUpdatesInRoutine = routine.equipments.some(e => successfulUUIDs.includes(e.uuid || ""));
          
          if (!hasUpdatesInRoutine) return routine;

          const updatedEquipments = routine.equipments.map((equip) => {
            if (successfulUUIDs.includes(equip.uuid || "")) {
              return { ...equip, withdrawn: true };
            }
            return equip;
          });

          return { ...routine, equipments: updatedEquipments };
        });

        const allEquipmentsWithdrawn = updatedRoutines.every((routine) =>
          routine.equipments.every((equip) => equip.withdrawn)
        );

        return {
          ...prev,
          withdrawn: allEquipmentsWithdrawn,
          routines: updatedRoutines,
        };
      });

      toast.custom(() => (
        <ToastSuccess text={`${successfulUUIDs.length} equipamentos entregues com sucesso!`} />
      ));
      
      if (equipmentsGrouped[0].collaborator) {
        await fetchEvents(equipmentsGrouped[0].collaborator);
      } else {
        setEquipmentsGrouped([])
      }
    }

    if (hasAnyForbidden) {
      setHasPermission(false);
    } else if (!hasAnySuccess) {
      toast.custom(() => (
        <ToastError text="Não foi possível atualizar os eventos." />
      ));
    }
  };

  const handleSearchBiometrics = async () => {
    setHasStarted(true)
    const response = await IdentifyBiometrics({ loading: setLoading })

    if (response) {
      if (response.status === 200 || response.status === 201) {
        const responseSearch = await collaboratorSearchBiometrics({
          loading: setLoading,
          biometrics: String(response.data.id),
          found: true,
          status: `${JSON.stringify(response.data)}`
        })

        if (!responseSearch || responseSearch.status !== 200) {
          setHasStarted(false)
          toast.custom(() => (
            <ToastError text='Não foi possível cadastrar a biometria' />
          ))
        } else {
          await fetchEvents(responseSearch.data.uuid)
          setHasStarted(false)
        }
      } else {
        setHasStarted(false)
        toast.custom(() => (
          <ToastError text='Não foi possível cadastrar a biometria' />
        ))
      }
    } else {
      toast.custom(() => (
        <ToastError text='Não foi possível cadastrar a biometria' />
      ))
    }
  }

  const handleProperClose = () => {
    setShowEvents(false)
    setHasStarted(false)
    handleClickOverlay()
  }

  const groupEquipments = (items: Equipment[]): Event[] => {
    type TempEvent = Omit<Event, "routines"> & {
      routinesMap: Record<string, RoutineEquipment>;
    };

    const groupedMap = items.reduce(
      (acc, item) => {
        const key = `${item.collaborator}_${String(item.expected_withdrawl_at)}`;

        if (!acc[key]) {
          acc[key] = {
            collaborator: item.collaborator,
            collaborator_name: item.collaborator_name,
            expected_withdrawl_at: item.expected_withdrawl_at,
            uuid: item.uuid,
            withdrawn: item.withdrawn,
            withdrawl_at: item.withdrawl_at,
            paused: item.paused,
            resumed_at: item.resumed_at,
            created_at: item.created_at,
            updated_at: item.updated_at,
            days_remaining: calcDaysRemaining(item.expected_withdrawl_at),
            routinesMap: {},
          };
        }

        const routineKey = String(item.routine);

        if (!acc[key].routinesMap[routineKey]) {
          acc[key].routinesMap[routineKey] = {
            id: item.routine,
            equipments: [],
          };
        }

        acc[key].routinesMap[routineKey].equipments.push({
          event: item.uuid,
          uuid: item.equipment,
          name: item.equipment_name,
          quantity: item.quantity,
          withdrawn: item.withdrawn,
          picture: item.equipment_picture,
          order: item.order,
        });

        return acc;
      },
      {} as Record<string, TempEvent>,
    );

    return Object.values(groupedMap).map((event) => {
      Object.values(event.routinesMap).forEach((routine) => {
        routine.equipments.sort((a, b) => {
          const orderA = a.order ?? 0;
          const orderB = b.order ?? 0;
          return orderA - orderB;
        });
      });
      const routinesArray = Object.values(event.routinesMap);
      const { routinesMap, ...finalEvent } = event;

      return {
        ...finalEvent,
        routines: routinesArray,
      };
    });
  };

  const fetchEvents = async (uuid: string) => {
    const response = await getEventsByCollaborator({
      loading: setLoading,
      collaborator: uuid,
      sortField: 'collaborator',
      sortOrder: 'desc',
      page: 1,
    })

    if (response) {
      if (response.status === 200) {
        setShowEvents(true)
        setEquipmentsGrouped(groupEquipments(response.data.data));
      } else if (response.status === 403) {
        setHasPermission(false);
      } else {
        toast.custom(() => (
          <ToastError text="Não foi possível buscar os eventos" />
        ));
      }
    } else {
      toast.custom(() => (
        <ToastError text="Não foi possível buscar os eventos" />
      ));
    }
  };

  const fetchEvent = async (id: string) => {
    const response = await getEvent({
      loading: setLoadingEvent,
      id
    });

    if (response) {
      if (response.status === 200) {
        if (response.data.need_approval === true) {
          setNeedApproval(true);
          handleCloseModalDelete();
        } else {
          handleCloseModal();
          setNeedApproval(false);
        }
      } else if (response.status === 403) {
        setHasPermission(false);
      } else {
        toast.custom(() => (
          <ToastError text="Não foi possível buscar o evento" />
        ));
      }
    } else {
      toast.custom(() => (
        <ToastError text="Não foi possível buscar o evento" />
      ));
    }
  };
  
  return (
    <Modal
      title={title}
      isModalOpen={isModalOpen}
      handleClickOverlay={handleProperClose}
      showClose={false}
      padding={false}
    >
      <AnimatePresence mode='wait'>
        {!showEvents && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full"
          >
            <div className='flex flex-col justify-center items-center gap-6 pt-6 w-full'>
              <div className='flex flex-row items-center gap-2'>
                <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
                  Autenticar Colaborador
                </h2>
              </div>

              <div className='flex flex-col'>
                <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
                  Peça ao colaborador para posicionar o dedo indicador da mão direita
                </span>
                <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
                  corretamente no leitor e aguarde a captura da digital.
                </span>
              </div>
            </div>

            <div className='flex justify-center items-center py-6 w-full'>
              <FingerPrintAnimationIcon size="w-40 h-40" progress={0} strokeWidth={1.2} started={hasStarted} />
            </div>

            <div className='flex justify-center items-center pb-8'>
              <div className='max-w-48 scale-95'>
                <PrimaryButton name='capture' action={handleSearchBiometrics} text='Iniciar captura' type='button' disabled={hasStarted} />
              </div>
            </div>
          </motion.div>
        )}

        {showEvents && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-center items-center gap-6 pt-6 w-full"
          >
            <Modal
              title="Filtros"
              size="small"
              isModalOpen={modalStatus}
              handleClickOverlay={handleCloseModal}
            >
              <div className="flex flex-col gap-10">
                <div className="flex flex-col">
                  <h2 className="font-medium text-xl">
                    {selectedEquipment?.collaborator_name}
                  </h2>
      
                  <span className="opacity-80 font-normal text-sm">
                    {totalEquipments} equipamento
                    {totalEquipments !== 1 ? "s" : ""} para entregar em{" "}
                    {timestampToDate(
                      String(selectedEquipment?.expected_withdrawl_at),
                    )}
                  </span>
                </div>
      
                {selectedEquipment?.routines.map((routine, i) => (
                  <ul key={routine.id} className="space-y-3">
                    {routine?.equipments.map((equipment, i) => (
                      <li
                        key={equipment.event}
                        className="flex flex-row gap-3 h-16 min-h-16"
                      >
                        <div className="relative bg-[--backgroundSecondary] rounded-xl w-16 min-w-16 aspect-square overflow-hidden">
                          {equipment.picture && equipment.picture.length > 3 && (
                            <Image
                              src={`https://api.inovasistemas.app${equipment.picture}`}
                              alt={equipment.name || "Imagem"}
                              fill
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex justify-start items-center -mt-0.5 w-full h-full">
                          <span className="inline-block overflow-hidden font-normal text-base text-ellipsis capitalize leading-none whitespace-nowrap">
                            {equipment.name?.toLocaleLowerCase()}
                          </span>
                        </div>
                        <div className="flex justify-end items-center gap-3 -mt-0.5 w-full h-full">
                          <span className="pr-3 font-medium text-[--text]">
                            x{equipment.quantity}
                          </span>
                        </div>
                      </li>
                    ))}
                    <li>
                      <div className="flex justify-end items-end w-full">
                        <AnimatePresence mode="wait">
                          {needApproval === false && (
                            <button
                              onClick={() =>
                                handleWithdrawnsEvent()
                              }
                              type="button"
                              className="relative flex justify-center items-center gap-2 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-6 py-2 rounded-xl font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none"
                            >
                              <motion.span
                                key="button-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm"
                              >
                                Entregar tudo
                              </motion.span>
                            </button>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </Modal>
            <Modal
              title=""
              size="extra-small"
              isModalOpen={modalDeleteStatus}
              handleClickOverlay={handleCloseModalDelete}
              showClose={false}
            >
              <div className="flex flex-col gap-2">
                <span className="font-medium text-xl text-center">
                  Deseja solicitar entrega antecipada?
                </span>
                <span className="px-6 text-base text-center">
                  Os equipamentos estão previstos para entrega em{" "}
                  <span className="font-medium text-[--errorLoader]">
                    {timestampToDate(
                      String(selectedEquipment?.expected_withdrawl_at),
                    )}
                  </span>
                  , de acordo com o cronograma confirmado.
                </span>
      
                <div className="z-[55] flex flex-row justify-center gap-3 pt-6">
                  <button
                    type="button"
                    onClick={handleCloseModalDelete}
                    className="group group z-[55] relative flex justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none"
                  >
                    <span className="font-medium text-white text-sm transition-all duration-300">
                      Solicitar
                    </span>
                  </button>
      
                  <button
                    type="button"
                    onClick={handleCloseModalDeleteGetOut}
                    className="group z-[55] relative flex justify-center items-center gap-3 bg-[--buttonPrimary] hover:bg-[--buttonSecondary] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none"
                  >
                    <span className="font-medium text-[--textSecondary] text-sm">
                      Fechar
                    </span>
                  </button>
                </div>
              </div>
            </Modal>
              <div className="flex flex-col items-start gap-3 bg-[--backgroundPrimary] sm:rounded-2xl w-full h-full overflow-auto">
                <div className='flex flex-col justify-center items-center gap-6 py-6 w-full'>
                <div className='flex flex-row items-center gap-2'>
                  <h2 className='font-medium text-[--textSecondary] text-xl select-none'>
                    Retirada de Equipamentos
                  </h2>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-y-6 pb-6 w-full h-full">
                <div className="flex flex-col gap-2 px-3">
                  <AnimatePresence mode="wait">
                    {loading && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col justify-center items-start gap-3 w-full h-full"
                      >
                        <Skeleton className="rounded-xl w-full h-[52px]" />
      
                        <div className="flex justify-center items-center pt-3 w-full">
                          <Paginations numberOfPages={calcPages(1, 1)} />
                        </div>
                      </motion.div>
                    )}
      
                    {!loading && (
                      <motion.div
                        key="data"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-6 pb-6 h-full overflow-y-auto"
                      >
                        <ul className="flex flex-col gap-3 px-6">
                          {equipmentsGrouped.map((equipment) => (
                            <li key={equipment.uuid}>
                              <button
                                type="button"
                                onClick={() => handleModal(equipment)}
                                className="gap-3 grid grid-cols-12 bg-[--tableRow] px-3 rounded-xl w-full font-normal text-[--textSecondary] text-sm capitalize transition-all duration-300"
                              >
                                <div className="flex items-center gap-3 col-span-10 py-3 font-medium">
                                  <span className="flex items-center gap-3 overflow-hidden text-ellipsis capitalize leading-none whitespace-nowrap">
                                    <div
                                      className={classNames(
                                        {
                                          "bg-[--errorLoader]":
                                            equipment.days_remaining < 0,
                                          "bg-[--chartGreen]":
                                            equipment.days_remaining === 0,
                                          "bg-[--fcc-background]":
                                            equipment.days_remaining > 0,
                                        },
                                        ["rounded-full min-h-3 min-w-3 w-3 h-3"],
                                      )}
                                    ></div>
                                    {equipment.collaborator_name}
                                  </span>
                                </div>
                                {/* <div className="flex items-center col-span-5 py-4 capitalize">
                                  {equipment.equipments
                                    .filter(Boolean)
                                    .map((eq) => eq.name)
                                    .join(", ")}
                                </div> */}
                                <div className="flex justify-end items-center col-span-2 py-4 pr-1 lowercase">
                                  {timestampToDate(
                                    String(equipment.expected_withdrawl_at),
                                  )}
                                </div>
                              </button>
                            </li>
                          ))}

                          {equipmentsGrouped.length === 0 && (
                            <li className='flex justify-center items-center w-full text-center'>
                              <span className='flex justify-center items-center text-center'>Nenhum equipamento para retirar</span>
                            </li>
                          )}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
}
