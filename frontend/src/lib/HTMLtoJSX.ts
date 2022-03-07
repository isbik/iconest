const attrs = [
	'accent-height',
	'alignment-baseline',
	'arabic-form',
	'baseline-shift',
	'cap-height',
	'clip-path',
	'clip-rule',
	'color-interpolation',
	'color-interpolation-filters',
	'color-profile',
	'color-rendering',
	'dominant-baseline',
	'enable-background',
	'fill-opacity',
	'fill-rule',
	'flood-color',
	'flood-opacity',
	'font-family',
	'font-size',
	'font-size-adjust',
	'font-stretch',
	'font-style',
	'font-variant',
	'font-weight',
	'glyph-name',
	'glyph-orientation-horizontal',
	'glyph-orientation-vertical',
	'horiz-adv-x',
	'horiz-origin-x',
	'image-rendering',
	'letter-spacing',
	'lighting-color',
	'marker-end',
	'marker-mid',
	'marker-start',
	'overline-position',
	'overline-thickness',
	'panose-1',
	'paint-order',
	'pointer-events',
	'rendering-intent',
	'shape-rendering',
	'stop-color',
	'stop-opacity',
	'strikethrough-position',
	'strikethrough-thickness',
	'stroke-dasharray',
	'stroke-dashoffset',
	'stroke-linecap',
	'stroke-linejoin',
	'stroke-miterlimit',
	'stroke-opacity',
	'stroke-width',
	'text-anchor',
	'text-decoration',
	'text-rendering',
	'transform-origin',
	'underline-position',
	'underline-thickness',
	'unicode-bidi',
	'unicode-range',
	'units-per-em',
	'v-alphabetic',
	'v-hanging',
	'v-ideographic',
	'v-mathematical',
	'vector-effect',
	'vert-adv-y',
	'vert-origin-x',
	'vert-origin-y',
	'word-spacing',
	'writing-mode',
	'x-height',
];

export const HTMLToJSX = (svg: string): string => {
	attrs.forEach((attr: string) => {
		let index = attr.indexOf('-');
		let value =
			attr.slice(0, index) +
			attr[index + 1].toUpperCase() +
			attr.slice(index + 2, attr.length);

		svg = svg.replace(attr, value);
	});

	return svg;
};
