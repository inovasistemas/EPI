import axios from 'axios'
import { dateToTimestamp } from '@/utils/date-to-timestamp'
import { extractOnlyNumbers } from '@/utils/extract-only-numbers'

export async function getCollaborators({
																				 loading,
																				 q,
																				 jobPosition,
																				 sortField,
																				 sortOrder,
																				 page = 1,
																			 }: CollaboratorsService) {
	try {
		loading(true)

		const params: Record<string, any> = {
			page,
		}

		if (q) params.q = q
		if (sortField) params.sortField = sortField
		if (sortOrder) params.sortOrder = sortOrder
		if (jobPosition) params.jobPosition = jobPosition

		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_HOST}/collaborators`,
			{ params, withCredentials: true },
		)

		loading(false)
		return response
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			loading(false)
			return error.response || null
		}

		loading(false)
		return null
	}
}

export async function getCollaborator({ loading, id }: CollaboratorService) {
	try {
		loading(true)

		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_HOST}/collaborators/${id}`,
			{ withCredentials: true },
		)

		loading(false)
		return response
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return error.response || null
		}

		loading(false)
		return null
	}
}

export async function deleteCollaborator({ loading, id }: CollaboratorService) {
	try {
		loading(true)

		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_HOST}/collaborators/${id}`,
			{ withCredentials: true },
		)

		loading(false)
		return response
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return error.response || null
		}

		loading(false)
		return null
	}
}

export async function updateCollaborator({
																					 loading,
																					 name,
																					 birthdate,
																					 rg,
																					 cpf,
																					 gender,
																					 job_position,
																					 admission_date,
																					 zip_code,
																					 address,
																					 number,
																					 neighborhood,
																					 city,
																					 state,
																					 phone,
																					 observations,
																					 id,
																				 }: UpdateCollaboratorService) {
	try {
		loading(true)

		const params = {
			name: name,
			birthdate: dateToTimestamp(birthdate ?? ''),
			rg: extractOnlyNumbers(rg ?? ''),
			cpf: extractOnlyNumbers(cpf ?? ''),
			gender,
			job_position,
			admission_date: dateToTimestamp(admission_date ?? ''),
			zip_code: extractOnlyNumbers(zip_code ?? ''),
			address,
			number,
			neighborhood,
			city,
			state,
			phone: extractOnlyNumbers(phone ?? ''),
			observations,
		}

		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_HOST}/collaborators/${id}`,
			params,
			{ withCredentials: true },
		)

		loading(false)
		return response
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return error.response || null
		}

		loading(false)
		return null
	}
}

export async function createCollaborator({
																					 name,
																					 birthdate,
																					 rg,
																					 cpf,
																					 gender,
																					 job_position,
																					 admission_date,
																					 zip_code,
																					 address,
																					 number,
																					 neighborhood,
																					 city,
																					 state,
																					 phone,
																					 observations,
																				 }: CreateCollaboratorService) {
	try {
		const params = {
			name: name,
			birthdate: dateToTimestamp(birthdate ?? ''),
			rg: extractOnlyNumbers(rg ?? ''),
			cpf: extractOnlyNumbers(cpf ?? ''),
			gender: gender ? gender : 'NOTINFORMED',
			job_position,
			admission_date: dateToTimestamp(admission_date ?? ''),
			zip_code: extractOnlyNumbers(zip_code ?? ''),
			address,
			number,
			neighborhood,
			city,
			state,
			phone: extractOnlyNumbers(phone ?? ''),
			observations,
		}

		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_HOST}/collaborators`,
			params,
			{ withCredentials: true },
		)

		return response
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return error.response || null
		}

		return null
	}
}

export async function collaboratorFaceRecognition(image: string) {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_HOST}/collaborators/face-recognition`,
			{ image: image },
			{ withCredentials: true },
		)

		return response
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return error.response || null
		}

		return null
	}
}
