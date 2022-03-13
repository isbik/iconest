import { isServer } from './isServer';

export const selectContent = (el: HTMLElement) => {
	if (isServer) return;

	let doc = window.document;
	let range;
	let selection: Selection | null;

	if (window.getSelection && doc.createRange) {
		selection = window.getSelection();
		range = doc.createRange();
		range.selectNodeContents(el);

		if (!selection) return;

		selection.removeAllRanges();
		selection.addRange(range);
	}
};
