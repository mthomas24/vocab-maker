import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function TextInput({ labelText, placeholder, defaultVal, labelClass, inputClass, isTextarea }) {
  const inputProps = {
    className: `rounded-md bg-gray-100 px-2 py-1 border ${inputClass}`,
    type: "text",
    defaultValue: defaultVal,
    placeholder: placeholder
  }

  return <>
    {labelText && <label className={`block text-sm opacity-70 mb-1 ${labelClass}`}>{labelText}</label>}
    {isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
  </>;
}

export function Modal({ children, open, onClose, classNames }) {
  useEffect(() => {
    // console.log("key thingy");
    function handleKey(e) {
      if (e?.code !== "Escape") return;
      // console.log("escaped")
      onClose();
      window.removeEventListener("keydown", handleKey);
    }

    window.addEventListener("keydown", handleKey);
    
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  document.body.classList.toggle("overflow-hidden", open);
  // document.body.classList.toggle("blur-sm", open);

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose()}
      />
      <div
        className="absolute inset-0 flex justify-center items-center backdrop-blur-sm pointer-events-none"
      >
        <div className={`bg-white rounded-xl p-6 pointer-events-auto ${classNames}`}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};