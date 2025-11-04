"use client";
import { SearchIcon } from "@/components/Display/Icons/Search";
import { Modal } from "@/components/Display/Modal";
import { PermissionDeniedScreen } from "@/components/Features/PermissionDenied";
import { Paginations } from "@/components/Navigation/Paginations";
import { CaretOrder } from "@/components/Template/Filter/CaretOrder";
import { ToastError } from "@/components/Template/Toast/Error";
import { ToastSuccess } from "@/components/Template/Toast/Success";
import { useQueryParams } from "@/components/Utils/UseQueryParams";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/lib/context/debounce";
import { getEvents, withdrawnEvent } from "@/services/Event";
import { calcDaysRemaining } from "@/utils/cal-days-remaining";
import { calcPages } from "@/utils/calc-pages";
import { timestampToDate } from "@/utils/timestamp-to-date";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
	type FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { toast } from "sonner";

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
	returned: boolean;
	returned_at: Date | null;
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
	returned: boolean;
	returned_at: Date | null;
	created_at: Date;
	updated_at: Date | null;
	order: number | null;
};

const tabs = ["ALL", "WITHDRAWAL", "OVERDUE"] as const;

const Agenda: FC = () => {
	const setQueryParam = useQueryParams();
	const searchParams = useSearchParams();
	const [filter, setFilter] = useState<"ALL" | "WITHDRAWAL" | "OVERDUE">("ALL");
	const tabRefs = useRef<Record<string, HTMLLabelElement | null>>({});
	const [hasPermission, setHasPermission] = useState(true);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 500 });
	const [loading, setLoading] = useState(false);
	const page = useMemo(() => {
		return searchParams.get("page");
	}, [searchParams]);
	const [bgStyle, setBgStyle] = useState({ x: 0, width: 0 });
	const [equipmentsGrouped, setEquipmentsGrouped] = useState<Event[]>([]);
	const [selectedEquipment, setSelectedEquipment] = useState<Event>();
	const [pageSettings, setPageSettings] = useState({
		numberOfDocuments: 1,
		numberPerPage: 1,
	});
	const [orderBy, setOrderBy] = useState({
		field: searchParams.get("sortField") || "",
		order: searchParams.get("sortOrder") || "",
	});
	const [modalStatus, setModalStatus] = useState(false);
	const [modalDeleteStatus, setModalDeleteStatus] = useState(false);

	const handleOrderBy = useCallback(
		(field: string) => {
			if (field !== orderBy.field) {
				setOrderBy({
					field,
					order: "asc",
				});
			} else {
				setOrderBy((prev) => ({
					...prev,
					order: prev.order === "asc" ? "desc" : "asc",
				}));
			}

			setQueryParam({
				sortField: field,
				sortOrder: orderBy.order === "asc" ? "desc" : "asc",
			});
		},
		[orderBy.field, orderBy.order, setQueryParam],
	);

	const handlePageSettings = (name: string, value: string) => {
		setPageSettings((prev) => ({
			...prev,
			[name]: value,
		}));
	};

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
						returned: item.returned,
						returned_at: item.returned_at,
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

	const fetchEvents = async () => {
		const response = await getEvents({
			loading: setLoading,
			q: debouncedSearch || undefined,
			sortField: orderBy.field || "withdrawlAt",
			sortOrder: orderBy.order || "asc",
			status: filter,
			page: Number(page) || undefined,
		});

		if (response) {
			if (response.status === 200) {
				handlePageSettings("numberOfDocuments", response.data.total);
				handlePageSettings("numberPerPage", response.data.per_page);
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

	const handleWithdrawnEvent = async (
		id: string,
		equipment: string,
		order: number,
	) => {
		if (!selectedEquipment) {
			return;
		}

		const targetRoutine = selectedEquipment.routines.find((routine) =>
			routine.equipments.some((equip) => equip.uuid === equipment),
		);

		if (!targetRoutine) {
			return;
		}

		const hasPendingPrevious = targetRoutine.equipments.some(
			(equip) => (equip.order ?? 0) < order && !equip.withdrawn,
		);

		if (hasPendingPrevious) {
			toast.custom(() => (
				<ToastError text="Você deve entregar os equipamentos anteriores desta rotina primeiro." />
			));
			return;
		}

		const response = await withdrawnEvent({
			loading: setLoading,
			id,
		});

		if (response) {
			if (response.status === 204) {
				setSelectedEquipment((prev) => {
					if (!prev) {
						return undefined;
					}

					const updatedRoutines = prev.routines.map((routine) => {
						if (routine.id !== targetRoutine.id) {
							return routine;
						}

						const updatedEquipments = routine.equipments.map((equip) => {
							if (equip.uuid === equipment) {
								return {
									...equip,
									withdrawn: true,
								};
							}
							return equip;
						});

						return {
							...routine,
							equipments: updatedEquipments,
						};
					});

					const allEquipmentsWithdrawn = updatedRoutines.every((routine) =>
						routine.equipments.every((equip) => equip.withdrawn),
					);

					return {
						...prev,
						withdrawn: allEquipmentsWithdrawn,
						routines: updatedRoutines,
					};
				});

				toast.custom(() => (
					<ToastSuccess text="Equipamento entregue com sucesso" />
				));
				fetchEvents();
			} else if (response.status === 403) {
				setHasPermission(false);
			} else {
				toast.custom(() => (
					<ToastError text="Não foi possível atualizar o evento" />
				));
			}
		} else {
			toast.custom(() => (
				<ToastError text="Não foi possível atualizar o evento" />
			));
		}
	};
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

		if (new Date(equipment.expected_withdrawl_at) > now) {
			handleCloseModalDelete();
		}

		handleCloseModal();
	};

	const handleCloseModalDelete = useCallback(() => {
		setModalDeleteStatus((prev) => !prev);
	}, []);

	const handleCloseModalDeleteGetOut = useCallback(() => {
		handleCloseModal();
		setModalDeleteStatus((prev) => !prev);
	}, []);

	useEffect(() => {
		const el = tabRefs.current[filter];
		if (el) {
			const { offsetLeft, offsetWidth } = el;
			setBgStyle({ x: offsetLeft, width: offsetWidth });
		}
	}, [filter]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: useExhaustiveDependencies
	useEffect(() => {
		fetchEvents();
	}, [debouncedSearch, orderBy, searchParams, filter]);

	return (
		<div className="flex flex-col gap-6 bg-[--backgroundSecondary] sm:pr-3 pb-8 sm:pb-3 w-full lg:h-[calc(100vh-50px)] overflow-auto">
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
											{equipment.quantity}
										</span>
										<div className="max-w-[10ch]">
											<button
												disabled={equipment?.withdrawn}
												name={`${equipment?.uuid}-action`}
												onClick={() =>
													handleWithdrawnEvent(
														equipment?.event || "",
														equipment.uuid || "",
														equipment.order || 0,
													)
												}
												type="button"
												className="relative flex justify-center items-center gap-2 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-6 py-2 rounded-xl w-full font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none"
											>
												<AnimatePresence mode="wait">
													<motion.span
														key="button-text"
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														transition={{ duration: 0.3 }}
														className="text-sm"
													>
														Entregar
													</motion.span>
												</AnimatePresence>
											</button>
										</div>
									</div>
								</li>
							))}
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
						Tem certeza que deseja prosseguir?
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
							className="group group z-[55] relative flex justify-center items-center gap-3 bg-[--errorLoader] px-8 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none"
						>
							<span className="font-medium text-white text-sm transition-all duration-300">
								Continuar
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
				<div className="flex justify-between items-center gap-3 p-6 pt-8 w-full">
					<div className="flex flex-row items-center gap-2">
						<h2 className="font-medium text-[--textSecondary] text-xl select-none">
							Agenda
						</h2>
					</div>
					<div className="box-border relative flex items-center gap-0.5 bg-[--backgroundSecondary] p-1 rounded-full">
						<motion.div
							className={classNames(
								{
									"bg-[--primaryColor]": filter === "ALL",
									"bg-[--chartGreen]": filter === "WITHDRAWAL",
									"bg-[--errorLoader]": filter === "OVERDUE",
								},
								["top-0 left-0 z-0 absolute mt-1 rounded-full h-10"],
							)}
							animate={{ x: bgStyle.x, width: bgStyle.width }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
						/>
						{tabs.map((tab) => (
							<label
								key={tab}
								ref={(el) => {
									tabRefs.current[tab] = el;
								}}
								className="z-10 relative flex items-center gap-2 px-3 py-2 rounded-full h-10 cursor-pointer"
							>
								<input
									type="radio"
									name="notificationStatus"
									value={tab}
									className="peer !hidden"
									checked={filter === tab}
									onChange={() => setFilter(tab)}
								/>
								<span className="font-medium text-[--textSecondary] peer-checked:text-white text-sm transition-all duration-300">
									{tab === "ALL"
										? "Todos"
										: tab === "WITHDRAWAL"
											? "Retirar"
											: "Atraso"}
								</span>
							</label>
						))}
					</div>
				</div>

				<AnimatePresence>
					{hasPermission && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="flex flex-row items-center gap-3 mt-1 px-6 w-1/2"
						>
							<div className="box-border flex flex-row items-center gap-2 bg-[--tableRow] focus-within:bg-[--buttonPrimary] px-3 rounded-xl w-full h-10 transition-all duration-300">
								<div className="flex">
									<SearchIcon
										size="size-4"
										stroke="stroke-[--textSecondary]"
										strokeWidth={2.5}
									/>
								</div>
								<input
									type="text"
									placeholder=""
									spellCheck={false}
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="bg-transparent pr-3 pl-1 rounded-xl focus:outline-none w-full h-full placeholder:font-normal font-medium text-sm"
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="flex flex-col justify-between gap-y-6 pb-6 w-full h-full">
					<div className="flex flex-col gap-2 px-3">
						<AnimatePresence mode="wait">
							{hasPermission && (
								<motion.div className="gap-3 grid grid-cols-12 px-3 font-medium text-[--textSecondary] text-sm">
									<div className="grid col-span-10 py-3">
										<div className="group flex justify-start items-center gap-2 transition-all duration-300">
											<button
												onClick={() => handleOrderBy("collaborator")}
												type="button"
												className="flex items-center gap-2 group-hover:opacity-60 truncate transition-all duration-300"
											>
												<span>Colaborador</span>
												<div className="min-w-4">
													<CaretOrder
														field={orderBy.field}
														name="collaborator"
														order={orderBy.order}
													/>
												</div>
											</button>
										</div>
									</div>
									<div className="flex justify-end items-center col-span-2 py-3">
										<button
											onClick={() => handleOrderBy("withdrawlAt")}
											type="button"
											className="flex items-center gap-2 hover:opacity-60 truncate transition-all duration-300"
										>
											<span>Retirar em</span>
											<CaretOrder
												field={orderBy.field}
												name="withdrawlAt"
												order={orderBy.order}
											/>
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
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
									<ul className="flex flex-col gap-3">
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
									</ul>
									<Paginations
										numberOfPages={calcPages(
											pageSettings.numberOfDocuments,
											pageSettings.numberPerPage,
										)}
									/>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				{!hasPermission && <PermissionDeniedScreen />}
			</div>
		</div>
	);
};

export default Agenda;
