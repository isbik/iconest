import { combine, createDomain, createEvent, createStore } from 'effector';
import { loadFromStorage, saveToStorage } from '../lib/effectorLS';
import { isServer } from '../lib/isServer';
import { Icon } from './icons';
import { setValue } from './_helpers';

export enum Mode {
	SVG = 'SVG',
	JSX = 'JSX',
}

type IconEditorStore = {
	mode: Mode;
	iconSize: number;
	iconColor: string;
	isCurrentColor: boolean;
	isInheritSize: boolean;
};

const iconEditorForm = createDomain('iconEditorForm');

export const $setIcon = createEvent<Icon | null>();
export const $setIconViewMode = createEvent<Mode>();
export const $setIconSize = createEvent<number>();
export const $setIconColor = createEvent<string>();
export const $setIsCurrentColor = createEvent<boolean>();
export const $setIsInheritSize = createEvent<boolean>();
export const $resetIconEditorStore = createEvent();

export const $selectedIconStore = createStore<null | Icon>(null).on(
	$setIcon,
	(_, v) => v
);

export const $iconEditorStore = iconEditorForm
	.createStore<IconEditorStore>({
		mode: Mode.SVG,
		iconSize: 28,
		iconColor: '#000000',
		isCurrentColor: true,
		isInheritSize: true,
	})
	.on($setIconViewMode, setValue('mode'))
	.on($setIconColor, setValue('iconColor'))
	.on($setIsCurrentColor, setValue('isCurrentColor'))
	.on($setIconSize, setValue('iconSize'))
	.on($setIsInheritSize, setValue('isInheritSize'))
	.reset($resetIconEditorStore);

export const $iconView = combine(
	$selectedIconStore,
	$iconEditorStore,
	(selectedIcon, { iconColor, iconSize, isCurrentColor, isInheritSize }) => {
		let code = selectedIcon?.svg;

		if (!code) return '';

		const color = isCurrentColor ? 'currentColor' : iconColor;

		code = code.replace(
			/(width="\d*")(?=\s)/m,
			` width="${isInheritSize ? '1em' : iconSize}" `
		);
		code = code.replace(
			/(height="\d*")(?=\s)/g,
			`height="${isInheritSize ? '1em' : iconSize}"`
		);
		code = code.replace(/(stroke="\w*")(?=\s)/m, ` stroke="${color}" `);

		if (!code.includes('stroke')) {
			code = code.replace(/(fill="\w*")(?=\s)/m, ` fill="${color}" `);
		}

		return code;
	}
);

if (!isServer) {
	loadFromStorage(iconEditorForm, window.localStorage);
	saveToStorage(iconEditorForm, window.localStorage);
}
