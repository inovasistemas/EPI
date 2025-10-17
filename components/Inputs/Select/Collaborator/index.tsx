import { SearchSelect } from '../SearchSelect'
import { SelectCollaboratorsProps } from './types'

export function SelectCollaborators({ value, onChange, CollaboratorsData, background }: SelectCollaboratorsProps) {
  return (
    <SearchSelect
      value={value}
      name='collaborator'
      options={
        CollaboratorsData
          ? CollaboratorsData.flatMap(collaborator => [
              { value: collaborator.uuid, label: collaborator.name }
            ])
          : []
      }
      placeholder='Colaborador'
      onChange={onChange}
      background={background}
    />
  )
}
