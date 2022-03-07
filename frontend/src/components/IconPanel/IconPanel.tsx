import clsx from 'clsx';
import { useStore } from 'effector-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { copyText } from '../../lib/copyText';
import { downloadSvg } from '../../lib/downloadSvg';
import { w3CodeColor } from '../../lib/highlight';
import { HTMLToJSX } from '../../lib/HTMLtoJSX';
import { selectContent } from '../../lib/selectContent';
import {
	$iconEditorStore,
	$iconView,
	$selectedIconStore,
	$setIconViewMode,
	Mode,
} from '../../store/iconEditor';
import IconViewSettings from './components/IconViewSettings';
import LayoutSettings from './components/LayoutSettings';

const IconPanel = () => {
	const { mode } = useStore($iconEditorStore);
	const icon = useStore($selectedIconStore);
	const iconViewStore = useStore($iconView);

	const iconCodeRef = useRef<HTMLPreElement>(null);
	const [copied, setCopied] = useState(false);

	const iconCode = useMemo(() => {
		if (mode === Mode.JSX) {
			return HTMLToJSX(iconViewStore);
		}
		return iconViewStore;
	}, [iconViewStore, mode]);

	useEffect(() => {
		if (iconCodeRef.current) {
			iconCodeRef.current.textContent = iconCode;
			w3CodeColor(iconCodeRef.current);
		}
	}, [iconCode, iconViewStore]);

	const handleDownloadIcon = () => {
		if (icon) downloadSvg(iconViewStore, icon?.name);
	};

	const handleCopyIcon = () => {
		if (iconCodeRef.current) selectContent(iconCodeRef.current);
		if (icon) copyText(iconViewStore);

		if (copied) return;

		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div
			style={{
				height: 'calc(100vh - 64px - 32px)',
			}}
			className="fixed flex flex-col w-[calc(19rem)] p-4 pb-0 overflow-auto rounded bg-gray-900 text-slate-100"
		>
			{!icon && <LayoutSettings />}

			{icon && (
				<>
					<IconViewSettings svg={iconViewStore} />
					<div className="bordered">
						<div className="flex gap-4 f-full">
							{Object.keys(Mode).map((key, index, arr) => (
								<button
									onClick={() => $setIconViewMode(key as Mode)}
									key={key}
									className={clsx(
										'bg-sky-500 text-slate-100  grow  p-1 rounded-tr rounded-tl',
										{
											'!bg-slate-100 text-sky-500': key === mode,
										}
									)}
								>
									{key}
								</button>
							))}
						</div>
						<pre
							onClick={handleCopyIcon}
							ref={iconCodeRef}
							className="p-2 overflow-auto text-xs break-words whitespace-normal rounded-b bg-slate-100"
						/>
					</div>
					<div className="sticky bottom-0 right-4 left-4 bg-gray-900">
						<div className="flex gap-4 py-4">
							<button
								onClick={handleDownloadIcon}
								className="w-1/2 py-2 font-bold rounded text-slate-100 bg-sky-500"
							>
								Download
							</button>
							<button
								onClick={handleCopyIcon}
								className="w-1/2 py-2 font-bold rounded bg-slate-100 text-sky-500"
							>
								{copied ? 'Copied' : 'Copy'}
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default IconPanel;
