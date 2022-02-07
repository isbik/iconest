import { createEvent, createStore } from "effector";
import { setValue } from "./_helpers";

export const LayoutSize = {
  xs: 50,
  sm: 60,
  md: 75,
  lg: 90,
};

export const $setIconLayoutSize = createEvent<number>();

export const $uiStore = createStore({
  iconLayoutSize: LayoutSize.md,
});

$uiStore.on($setIconLayoutSize, setValue("iconLayoutSize"));
