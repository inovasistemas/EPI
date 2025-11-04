import { logoutUserOn401 } from "@/utils/logout";
import axios from "axios";

export async function getEvents({
	loading,
	q,
	sortField,
	sortOrder,
	status = "ALL",
	page = 1,
}: GetEventsProps) {
	try {
		loading(true);

		const params: Record<string, any> = {
			page,
		};

		if (q) params.q = q;
		if (sortField) params.sortField = sortField;
		if (sortOrder) params.sortOrder = sortOrder;
		if (status) params.status = status;

		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_HOST}/events`,
			{
				params,
				withCredentials: true,
			},
		);
		loading(false);
		return response;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				logoutUserOn401();
			}
			loading(false);
			return error.response || null;
		}
		loading(false);
		return null;
	}
}

export async function withdrawnEvent({ loading, id }: WithdrawnEventProps) {
	try {
		loading(true);

		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_HOST}/events/${id}/withdrawn`,
			{},
			{
				withCredentials: true,
			},
		);
		loading(false);
		return response;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				logoutUserOn401();
			}
			loading(false);
			return error.response || null;
		}
		loading(false);
		return null;
	}
}
