import { MultiSelect } from '../MultiSelect'
import { SelectCollaboratorsProps } from './types'

export function SelectCollaborators({ value, onChange, CollaboratorsData, background }: SelectCollaboratorsProps) {
  return (
    <MultiSelect
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
      onChange={(selected) => {
        if (Array.isArray(selected)) {
          onChange?.(selected);
        }
      }}
      background={background}
      isMulti={true}
    />
  )
}
