import { useStore } from "effector-react";
import React, { memo, useState } from "react";
import { ChromePicker } from "react-color";
import {
  $iconEditorStore,
  $setIconColor,
  $setIsCurrentColor,
} from "../../../store/iconEditor";

type Props = {};

const IconColorPicker = (props: Props) => {
  const { iconColor, isCurrentColor } = useStore($iconEditorStore);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeColor = (color: string) => {
    if (color === iconColor || color === "currentColor") return;
    $setIconColor(color);
  };

  const handleChange = (v: { hex: string }) => handleChangeColor(v.hex);

  const handleCurrentColorChecked = () => {
    handleChangeColor("currentColor");
    $setIsCurrentColor(!isCurrentColor);
  };

  return (
    <div className="flex items-center mb-4">
      <label className="mr-2" htmlFor="color">
        Current Color
      </label>
      <input
        checked={isCurrentColor}
        className="mr-auto"
        id="color"
        type="checkbox"
        onChange={handleCurrentColorChecked}
      />

      <button
        disabled={isCurrentColor}
        className="flex items-center h-6 rounded-md disabled:opacity-50 border-slate-50 bg-slate-50 text-slate-900"
        onClick={handleClick}
      >
        <span className="px-1 pl-2 mr-1">{iconColor}</span>
        <div
          className="w-6 rounded aspect-square"
          style={{
            background: iconColor || "bg-slate-500",
          }}
        ></div>
      </button>

      {displayColorPicker ? (
        <div
          style={{
            position: "absolute",
            zIndex: "2",
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleClose}
          />
          <ChromePicker
            disableAlpha
            className="color-picker"
            color={iconColor}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(IconColorPicker);
