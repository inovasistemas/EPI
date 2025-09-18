import { EditIcon } from '@/components/Display/Icons/Edit'
import { SubIcon } from '@/components/Display/Icons/Sub'
import { Modal } from '@/components/Display/Modal'
import { NavAction } from '@/components/Inputs/Button/NavAction'
import { Subcategory } from '@/components/Inputs/Button/Subcategory'
import { ActionGroupAdd } from '@/components/Surfaces/ActionGroupAdd'
import { ToastError } from '@/components/Template/Toast/Error'
import { GroupLabel } from '@/components/Utils/Label/GroupLabel'
import { deleteCategory, getCategories } from '@/services/Category'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { CategoryModal } from './Modal'
import { Dialog } from '@/components/Dialog'
import { ToastSuccess } from '@/components/Template/Toast/Success'

export function Category() {
  const [modalConfirmationStatus, setModalConfirmationStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalProps, setModalProps] = useState({
    category: '',
    type: '',
  })
  const fetchedCategories = useRef(false)
  const [categoriesData, setCategoriesData] = useState<CategoryType[] | null>()
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleClick = (id?: string, type?: string) => {
    if (!id && !type) {
      setSelectedCategory('')
      setModalProps({ category: '', type: 'createCategory' })
    } else if (id && type) {
      setSelectedCategory(id)
      setModalProps({ category: id, type: type })
    }

    handleModalStatus()
  }

  const handleModalStatus = () => {
    setModalStatus(prev => !prev)
  }

  const fetchCategories = async () => {
    const response = await getCategories()

    if (response && response.status === 200) {
      setCategoriesData(response.data.data)
    } else {
      toast.custom(() => <ToastError text='Erro ao buscar categorias' />)
    }
  }

  const handleCloseModalConfirmation = () => {
    setModalConfirmationStatus(prev => !prev)
  }

  const handleDeleteCategory = async () => {
    const response = await deleteCategory(selectedCategory || '')
    if (response && response.status === 204) {
      toast.custom(() => <ToastSuccess text='Exclusão realizada com sucesso' />)
      fetchCategories()
      handleCloseModalConfirmation()
      handleModalStatus()
    } else {
      toast.custom(() => <ToastError text='Erro ao excluir categoria' />)
    }
  }

  useEffect(() => {
    if (fetchedCategories.current) return
    fetchedCategories.current = true
    fetchCategories()
  }, [])

  return (
    <>
      <Modal
        title=''
        size='small'
        isModalOpen={modalStatus}
        handleClickOverlay={handleModalStatus}
        showClose={false}
        overflow={true}
      >
        <CategoryModal
          category={modalProps.category}
          type={modalProps.type}
          modalAction={handleModalStatus}
          reload={fetchCategories}
          confirmationModal={handleCloseModalConfirmation}
        />
      </Modal>
      <Modal
        title=''
        size='extra-small'
        isModalOpen={modalConfirmationStatus}
        handleClickOverlay={handleCloseModalConfirmation}
        showClose={false}
      >
        <Dialog
          title={'Tem certeza que deseja excluir a categoria?'}
          description='Esta ação é irreversível e todos os dados associados serão permanentemente apagados.'
          handleDelete={handleDeleteCategory}
          handleCancel={handleCloseModalConfirmation}
        />
      </Modal>
      <div className='relative flex flex-col w-full h-full'>
        <div className='flex flex-col px-6 divide-y divide-[--border] h-full min-h-80 overflow-y-auto'>
          <div className='py-6 select-none'>
            <h2 className='font-medium text-xl leading-none'>
              Categorias e subcategorias
            </h2>
            <span className='opacity-60 text-[--textSecondary] text-sm'>
              Estruture equipamentos por categorias e subcategorias conforme sua
              empresa.
            </span>
          </div>

          {categoriesData?.map((category, i) => (
            <div
              key={category.uuid}
              className='items-start gap-6 grid grid-cols-1 py-6 select-none'
            >
              <div className='flex flex-col'>
                <div className='flex flex-row justify-between gap-2 itens-center'>
                  <span className='font-medium capitalize'>
                    {category.name.toLocaleLowerCase()}
                  </span>
                  <div className='flex flex-row items-center gap-2'>
                    <button
                      onClick={() =>
                        handleClick(category.uuid, 'createSubcategory')
                      }
                      type='button'
                      className='group z-[200] relative flex justify-center items-center gap-2 bg-[--backgroundSecondary] hover:bg-[--buttonHover] px-3 pr-4 rounded-xl h-8 text-zinc-200 active:scale-95 transition'
                    >
                      <SubIcon
                        size='size-4'
                        stroke='stroke-[--textSecondary] group-data-[active=true]:stroke-[--primaryColor]'
                        strokeWidth={2}
                      />
                      <span className='font-medium text-[--textSecondary] text-xs'>
                        Adicionar Subcategoria
                      </span>
                    </button>
                    <NavAction
                      type='button'
                      desktop={true}
                      icon={
                        <EditIcon
                          size='size-4'
                          stroke='stroke-[--iconPrimaryColor] group-data-[active=true]:stroke-[--primaryColor]'
                          strokeWidth={2.5}
                        />
                      }
                      mobile={true}
                      action={() => handleClick(category.uuid, 'editCategory')}
                    />
                  </div>
                </div>

                <div>
                  <div className='block relative col-span-full -mt-1 mb-4 -ml-1'>
                    <GroupLabel
                      isVisible={true}
                      label={`${category.active_equipments} equipamento${category.active_equipments > 1 || category.active_equipments === 0 ? 'es' : ''} nessa categoria`}
                      showFixed={false}
                    />
                  </div>
                </div>

                {category.subcategories.length > 0 && (
                  <div className='pt-6'>
                    <div className='block relative col-span-full mb-4 -ml-1'>
                      <GroupLabel
                        isVisible={true}
                        label='Subcategorias'
                        showFixed={false}
                      />
                    </div>
                  </div>
                )}

                <div className='flex flex-wrap gap-2 pt-3'>
                  {category.subcategories.map((subcategory, j) => (
                    <Subcategory
                      key={subcategory.uuid}
                      id={subcategory.uuid}
                      label={subcategory.name.toLocaleLowerCase()}
                      onClick={() =>
                        handleClick(subcategory.uuid, 'editSubcategory')
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <ActionGroupAdd addLabel='Adicionar' onClick={handleClick} />
      </div>
    </>
  )
}
