import { isServer } from './isServer';

export const fetchCollection = async (name: string) => {
	if (isServer) return;

	return fetch(window.location.href + '/api/' + name)
		.then((res) => res.json())
		.then(({ data }) => data);
};
