export const setValue =
	(key: string) =>
	<State extends Record<string, unknown>, Payload>(
		state: State,
		payload: Payload
	): State => {
		if (state[key] === payload) return state;
		return { ...state, [key]: payload };
	};
