import { SearchSelect } from '../SearchSelect'
import { SelectJobPositionsProps } from '@/components/Inputs/Select/JobPositions/types'
import { useEffect, useRef, useState } from 'react'
import { getJobPositions } from '@/services/JobPosition'
import { toast } from 'sonner'
import { ToastError } from '@/components/Template/Toast/Error'

export function SelectJobPositions({ value, onChange }: SelectJobPositionsProps) {
	const fetchedJobPositions = useRef(false)
	const [jobPositionsData, setJobPositionsData] = useState([
		{
			uuid: '',
			name: '',
			sector: '',
			created_at: '',
			updated_at: '',
		},
	])

	const fetchJobPositions = async () => {
		const response = await getJobPositions()

		if (response && response.status === 200) {
			setJobPositionsData(response.data.data)
		} else {
			toast.custom(() => <ToastError text="Erro ao buscar cargos" />)
		}
	}

	useEffect(() => {
		if (fetchedJobPositions.current) return
		fetchedJobPositions.current = true
		fetchJobPositions()
	}, [])

	return (
		<SearchSelect
			value={value}
			name="jobPosition"
			options={
				jobPositionsData
					? jobPositionsData.map(jobPosition => ({
						value: jobPosition.uuid,
						label: jobPosition.name,
					}))
					: []
			}
			placeholder="Cargo"
			onChange={onChange}
		/>
	)
}