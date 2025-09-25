import { useEffect, useRef, useState } from 'react'
import { FloppyDiskIcon } from '@/components/Display/Icons/FloppyDisk'
import { FormInput } from '@/components/Inputs/Text/FormInput'
import {
  createCategory,
  createSubcategory,
  getCategory,
  updateCategory,
} from '@/services/Category'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'
import { ToastSuccess } from '@/components/Template/Toast/Success'
import { TrashIcon } from '@/components/Display/Icons/Trash'
import { PermissionDeniedScreen } from '../../PermissionDenied'

export function CategoryModal({
  category,
  type,
  modalAction,
  reload,
  confirmationModal,
}: CategoryModalProps) {
  const fetchedCategory = useRef(false)
  const [loading, setLoading] = useState(false)
  const [hasPermission, setHasPermission] = useState(true)
  const [categoryData, setCategoryData] = useState({
    id: category,
    parentName: '',
    name: '',
  })
  const handleCategoryDataChange = (name: string, value: string | boolean) => {
    setCategoryData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const getTitle = () => {
    if (category === '') {
      return 'Adicionar nova categoria'
    } else if (type === 'editCategory') {
      return 'Editar dados da categoria'
    } else if (type === 'editSubcategory') {
      return 'Editar dados da subcategoria'
    }

    if (!categoryData.parentName) {
      return 'Carregando nome da categoria...'
    }

    return (
      <>
        <span>Adicionar subcategoria à </span>
        <span className='font-medium text-[--primaryColor] capitalize'>
          {categoryData.parentName.toLocaleLowerCase()}
        </span>
      </>
    )
  }

  const getSubtitle = () => {
    if (type === 'createCategory') {
      return 'Adicione um nova categoria para organizar os equipamentos da empresa.'
    }
    if (type === 'createSubcategory') {
      return 'Adicione uma nova subcategoria para organizar os equipamentos da empresa.'
    } else if (type === 'editCategory') {
      return 'Edite esta categoria para organizar os equipamentos da empresa.'
    } else if (type === 'editSubcategory') {
      return 'Edite esta subcategoria para organizar os equipamentos da empresa.'
    }

    if (!categoryData.parentName) {
      return ''
    }
  }

  const fetchPermissionGroups = async () => {
    if (category && category !== '') {
      const response = await getCategory({id: category, loading: setLoading})

      if (response) {
        if (response.status === 200) {
          const data = response.data.data

          if (type === 'createSubcategory') {
            setCategoryData(prev => ({
              ...prev,
              parentName: data.name.toLocaleLowerCase(),
            }))
          } else {
            setCategoryData(prev => ({
              ...prev,
              parentName: data.parentName
                ? data.parentName.toLocaleLowerCase()
                : '',
              name: data.name,
            }))
          }
        } else if (response.status === 401) {
          setHasPermission(false)
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível buscar a categoria' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível buscar a categoria' />
        ))
      }
    }
  }

  const handleUpdate = async () => {
    if (
      category &&
      category !== '' &&
      type !== 'createCategory' &&
      type !== 'createSubcategory'
    ) {
      const response = await updateCategory(category, categoryData.name)

      if (response) {
        if (response.status === 200) {
          toast.custom(() => (
            <ToastSuccess text='Categoria atualizada com sucesso' />
          ))
          modalAction()
          reload()
        } else if (response.status === 401) {
          toast.custom(() => (
            <ToastError text='Você não possui autorização para atualizar esta categoria' />
          ))
        } else {
          toast.custom(() => (
            <ToastError text='Não foi possível atualizar a categoria. Verifique os campos obrigatórios e tente novamente' />
          ))
        }
      } else {
        toast.custom(() => (
          <ToastError text='Não foi possível atualizar a categoria. Verifique os campos obrigatórios e tente novamente' />
        ))
      }
    } else {
      if (type && type !== '') {
        if (type === 'createCategory') {
          const response = await createCategory(categoryData.name)

          if (response) {
            if (response.status === 201) {
              toast.custom(() => (
                <ToastSuccess text='Categoria criada com sucesso' />
              ))
              modalAction()
              reload()
            } else if (response.status === 401) {
              toast.custom(() => (
                <ToastError text='Você não possui autorização para excluir esta categoria' />
              ))
            } else {
              toast.custom(() => (
                <ToastError text='Não foi possível criar a categoria. Verifique os campos obrigatórios e tente novamente' />
              ))
            }
          } else {
            toast.custom(() => (
              <ToastError text='Não foi possível criar a categoria. Verifique os campos obrigatórios e tente novamente' />
            ))
          }
        }

        if (type === 'createSubcategory') {
          if (category && category !== '') {
            const response = await createSubcategory(
              category,
              categoryData.name
            )

            if (response) {
              if (response.status === 201) {
                toast.custom(() => (
                  <ToastSuccess text='Subcategoria criado com sucesso' />
                ))
                modalAction()
                reload()
              } else if (response.status === 401) {
                toast.custom(() => (
                  <ToastError text='Você não possui autorização para criar esta subcategoria' />
                ))
              } else {
                toast.custom(() => (
                  <ToastError text='Não foi possível criar a subcategoria. Verifique os campos obrigatórios e tente novamente' />
                ))
              }
            } else {
              toast.custom(() => (
                <ToastError text='Não foi possível criar a subcategoria. Verifique os campos obrigatórios e tente novamente' />
              ))
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (fetchedCategory.current) return
    fetchedCategory.current = true

    if (category !== '') {
      fetchPermissionGroups()
    }
  }, [category])

  return (
    <div className='flex flex-col justify-center items-center gap-6 w-full h-full'>
      {hasPermission && !loading && (
        <>
          <div className='flex flex-col items-center gap-3 w-full'>
            <h2 className='font-medium text-xl leading-none'>{getTitle()}</h2>
            <div className='flex flex-col'>
              <span className='opacity-60 text-[--textSecondary] text-sm text-center'>
                {getSubtitle()}
              </span>
            </div>
          </div>

          <div className='gap-3 w-full'>
            <FormInput
              name='name'
              label='Nome'
              required={false}
              type='text'
              value={categoryData.name.toLocaleLowerCase()}
              position='right'
              onChange={e => handleCategoryDataChange('name', e.target.value)}
              textTransform='capitalize'
            />
          </div>

          <div className='flex flex-row justify-end w-full'>
            <div className='flex flex-row gap-3'>
              {category &&
                category !== '' &&
                (type === 'editCategory' || type === 'editSubcategory') && (
                  <button
                    onClick={confirmationModal}
                    type='button'
                    className='group group z-[55] relative flex justify-center items-center gap-3 bg-transparent hover:bg-[--errorLoader] px-4 pr-5 rounded-xl h-10 text-white active:scale-95 transition-all duration-300 cursor-pointer select-none'
                  >
                    <TrashIcon
                      size='size-4'
                      stroke='stroke-[--textSecondary] group-hover:stroke-white'
                      strokeWidth={2.5}
                    />

                    <span className='font-medium text-[--textSecondary] group-hover:text-white text-sm transition-all duration-300'>
                      Excluir
                    </span>
                  </button>
                )}
              <button
                onClick={handleUpdate}
                type='button'
                className='group relative flex flex-row justify-center items-center gap-3 bg-[--primaryColor] hover:bg-[--secondaryColor] disabled:bg-[--buttonPrimary] px-4 pr-5 rounded-xl h-10 font-medium text-white disabled:text-zinc-500 text-base active:scale-95 transition-all duration-300 select-none'
              >
                <FloppyDiskIcon
                  size='size-4'
                  stroke='stroke-white group-data-[disabled=true]:stroke-zinc-500 group-data-[active=true]:stroke-[--primaryColor]'
                  strokeWidth={2.5}
                />
                <span className='font-medium text-sm'>Salvar</span>
              </button>
            </div>
          </div>
        </>
      )}

      {!hasPermission && (
        <div className='mt-16'>
          <PermissionDeniedScreen />
        </div>
      )}
    </div>
  )
}
