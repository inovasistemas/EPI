import { MultiSelect } from '../MultiSelect'
import { SelectSectorsProps } from './types'

export function SelectSectors({ value, onChange, SectorsData, background }: SelectSectorsProps) {
  return (
    <MultiSelect
      value={value}
      name='sector'
      options={
        SectorsData
          ? SectorsData.flatMap(sector => [
              { value: sector.uuid, label: sector.name },
              ...(sector.subsectors?.map(sub => ({
                value: sub.uuid,
                label: sub.name,
              })) ?? []),
            ])
          : []
      }
      placeholder='Setor'
      isMulti={true}
      onChange={(selected) => {
        if (Array.isArray(selected)) {
          onChange?.(selected);
        }
      }}
      background={background}
    />
  )
}
