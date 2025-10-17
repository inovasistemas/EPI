import { SearchSelect } from '../SearchSelect'
import { SelectSectorsProps } from './types'

export function SelectSectors({ value, onChange, SectorsData, background }: SelectSectorsProps) {
  return (
    <SearchSelect
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
      onChange={onChange}
      background={background}
    />
  )
}
