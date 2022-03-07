import { createEffect, createEvent, createStore, sample } from 'effector';
import { fetchCollection } from '../lib/fetch';

export type Icon = {
	name: string;
	tags: string[];
	svg: string;
};

export const $fetchCollectionsFx = createEffect<string, any>();

export const $setIconSet = createEvent<{ set: string; icons: Icon[] }>();

export const $iconsCacheStore = createStore({} as Record<string, Icon[]>).on(
	$fetchCollectionsFx.done,
	(cache, { params, result }) => {
		if (params in cache) return cache;
		return {
			...cache,
			[params]: result,
		};
	}
);

$iconsCacheStore.watch((cache) => {
	$fetchCollectionsFx.use(async (name) => {
		const cachedResult = cache[name];
		if (cachedResult) return cachedResult;
		return fetchCollection(name as string);
	});
});

export const $iconsStore = createStore({
	set: '',
	icons: [] as Icon[],
});

$iconsStore.on(
	$setIconSet,
	(state, payload: { set: string; icons: Icon[] }) => ({
		...state,
		...payload,
	})
);

sample({
	clock: $fetchCollectionsFx.done,
	source: [$iconsStore, $iconsCacheStore],
	fn: (_, { params, result }) => {
		return { set: params, icons: result };
	},
	target: $setIconSet,
});
