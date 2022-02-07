import { useStore } from "effector-react";
import React, { memo } from "react";
import {
  $iconEditorStore,
  $resetIconEditorStore,
  $setIcon,
  $setIconSize,
} from "../../../store/iconEditor";
import IconColorPicker from "./IconColorPicker";

type Props = {
  svg: string;
};

const IconViewSettings = ({ svg }: Props) => {
  const { selectedIcon, iconSize } = useStore($iconEditorStore);

  if (!selectedIcon) return null;

  const handleReset = () => {
    const icon = { ...selectedIcon };

    $resetIconEditorStore();

    $setIcon(icon);
  };

  return (
    <>
      <div className="flex items-center mb-2 mr-auto text-slate-100">
        <p className="flex overflow-hidden grow text-ellipsis whitespace-nowrap">
          {selectedIcon.name}
        </p>
        <button
          onClick={handleReset}
          className="mr-2 px-2 py-0.5 rounded text-sky-500 bg-slate-100"
        >
          reset
        </button>
        <button
          onClick={() => $setIcon(null)}
          className="px-2 py-0.5 rounded bg-sky-500 text-slate-100"
        >
          close
        </button>
      </div>
      <div
        key={selectedIcon.name}
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
        className="flex items-center justify-center h-48 mb-4 rounded bg-slate-200 text-slate-900"
      ></div>
      <div className="flex gap-4 mb-2">
        <label htmlFor="Size">Size</label>
        <input
          value={iconSize}
          className="mr-auto"
          onChange={(event) => $setIconSize(+event.target.value)}
          type="range"
          id="Size"
          name="Size"
          min="14"
          max="100"
        />
        {iconSize + "px"}
      </div>
      <IconColorPicker />
    </>
  );
};

export default memo(IconViewSettings);
