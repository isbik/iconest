import clsx from "clsx";
import React, {
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { copyText } from "../lib/copyText";
import { downloadSvg } from "../lib/downloadSvg";
import { w3CodeColor } from "../lib/highlight";
import { HTMLToJSX } from "../lib/HTMLtoJSX";
import { selectContent } from "../lib/selectContent";
import { Icon } from "../pages";

type Props = {
  icon: Icon | null;
  reset: () => void;
};

export enum Mode {
  SVG = "SVG",
  JSX = "JSX",
}

const IconPanel = ({ icon, reset: handleResetIcon }: Props) => {
  const iconCodeRef = useRef<HTMLPreElement>(null);
  const [mode, setMode] = useState(Mode.SVG);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (iconCodeRef.current) w3CodeColor(iconCodeRef.current);
    setCopied(false);
  }, [icon, mode]);

  const handleCopyIcon = () => {
    if (iconCodeRef.current) selectContent(iconCodeRef.current);
    if (icon) copyText(icon?.svg);

    if (copied) return;

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadIcon = () => {
    if (icon) downloadSvg(icon?.svg, icon?.name);
  };

  const iconCode = useMemo(() => {
    if (!icon) return "";
    if (mode === Mode.JSX) {
      return HTMLToJSX(icon.svg);
    }

    return icon?.svg;
  }, [icon, mode]);

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 64px - 32px)",
          width: "calc(20rem - 16px)",
        }}
        className="rounded p-4 bg-slate-400 fixed overflow-x-auto"
      >
        {icon && (
          <>
            <div className="mb-2 flex justify-between items-center text-slate-100">
              {icon.name}
              <button
                onClick={handleResetIcon}
                className="px-2 py-0.5 rounded text-sky-500 bg-slate-100"
              >
                close
              </button>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: icon?.svg,
              }}
              className="mb-4 py-20 bg-slate-200 rounded flex items-center justify-center"
            ></div>
            <div className="mb-4 bordered">
              <div className="flex f-full gap-4">
                {Object.keys(Mode).map((key, index, arr) => (
                  <button
                    onClick={() => setMode(key as SetStateAction<Mode>)}
                    key={key}
                    className={clsx(
                      "bg-sky-500 text-slate-100  grow  p-1 rounded-tr rounded-tl",
                      {
                        "!bg-slate-100 text-sky-500": key === mode,
                      }
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <pre
                key={mode}
                onClick={handleCopyIcon}
                ref={iconCodeRef}
                className="bg-slate-100 rounded-b overflow-auto p-2 whitespace-normal break-words"
              >
                {iconCode}
              </pre>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleDownloadIcon}
                className="rounded font-bold w-1/2 text-slate-100 bg-sky-500 py-2"
              >
                Download
              </button>
              <button
                onClick={handleCopyIcon}
                className="rounded font-bold w-1/2 bg-slate-100 text-sky-500 py-2"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default IconPanel;
