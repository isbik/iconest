import { useStore } from "effector-react";
import React, { memo } from "react";
import {
  $iconEditorStore,
  $resetIconEditorStore,
  $selectedIconStore,
  $setIcon,
  $setIconSize,
  $setIsInheritSize,
} from "../../../store/iconEditor";
import IconColorPicker from "./IconColorPicker";

type Props = {
  svg: string;
};

const IconViewSettings = ({ svg }: Props) => {
  const { iconSize, isInheritSize } = useStore($iconEditorStore);
  const selectedIcon = useStore($selectedIconStore);

  if (!selectedIcon) return null;

  const handleReset = () => {
    const icon = { ...selectedIcon };

    $resetIconEditorStore();

    $setIcon(icon);
  };

  return (
    <>
      <div className="flex items-center mb-4 text-slate-100">
        <p className="flex overflow-hidden font-bold grow text-ellipsis whitespace-nowrap">
          {selectedIcon.name}
        </p>
        <button
          onClick={handleReset}
          className="mr-2 text-white rounded hover:text-sky-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />{" "}
          </svg>
        </button>
        <button
          onClick={() => $setIcon(null)}
          className="rounded hover:text-sky-500 text-slate-100"
        >
          <svg
            viewBox="0 0 24 24"
            width="25"
            height="25"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div
        key={selectedIcon.name}
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
        className="text-3xl flex items-center justify-center w-full mb-4 rounded min-h-[8rem] bg-slate-200 text-slate-900"
      ></div>
      <div className="flex items-center mb-2">
        <label className="mr-2" htmlFor="color">
          Inherit size
        </label>
        <input
          checked={isInheritSize}
          className="mr-auto"
          id="color"
          type="checkbox"
          onChange={() => $setIsInheritSize(!isInheritSize)}
        />
        <span className="mx-1 text-xs grow">
          {isInheritSize ? "1em" : iconSize + "px"}
        </span>
        <input
          disabled={isInheritSize}
          value={iconSize}
          className="mr-auto disabled:opacity-10"
          onChange={(event) => $setIconSize(+event.target.value)}
          type="range"
          id="Size"
          name="Size"
          min="14"
          max="100"
        />
      </div>
      <IconColorPicker />
    </>
  );
};

export default memo(IconViewSettings);
