type GetEventsProps = {
	loading: React.Dispatch<React.SetStateAction<boolean>>;
	q?: string;
	sortField?: string;
	sortOrder?: string;
	status?: string;
	page?: number;
};

type WithdrawnEventProps = {
	loading: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
};
