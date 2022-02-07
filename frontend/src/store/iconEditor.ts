import { createEvent, createStore } from "effector";
import { Icon } from "./icons";
import { setValue } from "./_helpers";

export enum Mode {
  SVG = "SVG",
  JSX = "JSX",
}

export const $setIcon = createEvent<Icon | null>();
export const $setIconViewMode = createEvent<Mode>();
export const $setIconSize = createEvent<number>();
export const $setIconColor = createEvent<string>();
export const $setIsCurrentColor = createEvent<boolean>();
export const $resetIconEditorStore = createEvent();

export const $iconEditorStore = createStore<{
  selectedIcon: null | Icon;
  mode: Mode;
  iconSize: number;
  iconColor: string;
  isCurrentColor: boolean;
}>({
  selectedIcon: null,
  mode: Mode.SVG,
  iconSize: 55,
  iconColor: "#000000",
  isCurrentColor: true,
})
  .on($setIcon, setValue("selectedIcon"))
  .on($setIconViewMode, setValue("mode"))
  .on($setIconColor, setValue("iconColor"))
  .on($setIsCurrentColor, setValue("isCurrentColor"))
  .on($setIconSize, setValue("iconSize"))
  .reset($resetIconEditorStore);

export const $iconView = $iconEditorStore.map(
  ({ selectedIcon, iconColor, iconSize, isCurrentColor }) => {
    let code = selectedIcon?.svg;

    if (!code) return "";

    const color = isCurrentColor ? "currentColor" : iconColor;

    code = code.replace(/(width="\d*")(?=\s)/m, ` width="${iconSize}" `);
    code = code.replace(/(height="\d*")(?=\s)/g, `height="${iconSize}"`);
    code = code.replace(/(stroke="\w*")(?=\s)/m, ` stroke="${color}" `);

    if (!code.includes("stroke")) {
      code = code.replace(/(fill="\w*")(?=\s)/m, ` fill="${color}" `);
    }

    return code;
  }
);
