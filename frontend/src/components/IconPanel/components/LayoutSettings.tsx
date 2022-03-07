import clsx from "clsx";
import { useStore } from "effector-react";
import React from "react";
import { ICON_SETS } from "../../../constants";
import { $fetchCollectionsFx, $iconsStore } from "../../../store/icons";
import { $setIconLayoutSize, $uiStore, LayoutSize } from "../../../store/ui";

type Props = {};

const LayoutSettings = (props: Props) => {
  const uiStore = useStore($uiStore);
  const iconsStore = useStore($iconsStore);

  return (
    <>
      <p className="mb-4 text-lg font-bold">Icon sets</p>
      <div className="flex flex-col gap-2 mb-4">
        {Object.entries(ICON_SETS).map(([key, { icon }]) => (
          <div
            key={key}
            onClick={() => $fetchCollectionsFx(key as keyof typeof ICON_SETS)}
            className={clsx(
              "flex items-center cursor-pointer bg-slate-100 text-sky-500 rounded px-4 py-3",
              {
                "!text-slate-100 bg-sky-500 ": iconsStore.set === key,
              }
            )}
          >
            {icon}
            <span className="ml-2">{key}</span>
          </div>
        ))}
      </div>
      <p className="mb-4 text-lg font-bold">Layout icon size</p>
      <div className="flex gap-4 mb-auto">
        {Object.entries(LayoutSize).map(([key, value]) => (
          <div
            onClick={() => $setIconLayoutSize(value)}
            className={clsx(
              {
                "!text-slate-100 bg-sky-500 ": uiStore.iconLayoutSize === value,
              },
              "cursor-pointer font-bold text-lg rounded flex items-center justify-center aspect-square w-1/4 bg-slate-100 text-sky-500"
            )}
            key={key}
          >
            {key}
          </div>
        ))}
      </div>

      <a
        target={"_blank"}
        className="my-4"
        href="https://www.buymeacoffee.com/bikishovdY"
        rel="noreferrer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full"
          alt="Coffee"
          src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=bikishovdY&button_colour=5F7FFF&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
        />
      </a>
    </>
  );
};

export default LayoutSettings;
