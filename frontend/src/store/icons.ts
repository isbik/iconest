import { createEffect, createEvent, createStore } from "effector";
import { fetchCollection } from "../lib/fetch";

export type Icon = {
  name: string;
  tags: string[];
  svg: string;
};

export const $fetchCollections = createEffect<string, any>();
export const $loadingCollection = $fetchCollections.pending;

export const $setIconSet = createEvent<{ set: string; icons: Icon[] }>();

export const $iconsStore = createStore({
  cached: {} as Record<string, Icon[]>,
  set: "",
  icons: [] as Icon[],
});

$iconsStore.on(
  $setIconSet,
  (state, payload: { set: string; icons: Icon[] }) => ({
    ...state,
    ...payload,
  })
);

// @ts-ignore
$iconsStore.on($fetchCollections.finally, (state, { result }) => {
  return { ...state, ...result };
});

$iconsStore.watch((state) => {
  $fetchCollections.use(async (name: string) => {
    if (state.cached[name])
      return {
        set: name,
        icons: state.cached[name],
      };

    const data = await fetchCollection(name as string);

    const params = { set: name, icons: data };
    state.cached[name] = data;
    return params;
  });
});
