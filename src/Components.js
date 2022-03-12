import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";

export const newTerm = (wrd = "", def = "") => ({
  word: wrd,
  definition: def,
  id: uuid()
});

export function TextInput({
  labelText, placeholder, defaultVal, labelClass, inputClass, isTextarea, onChange, onBlur
}) {
  let inputProps = {
    className: `rounded-md bg-gray-100 px-2 py-1 border mm-focus:outline-emerald-400 ${inputClass}`,
    type: "text",
    defaultValue: defaultVal,
    placeholder: placeholder,
    onChange: onChange,
    onBlur: onBlur
  }

  return <>
    {labelText && <label className={`block text-sm text-gray-500 bopacity-70 mb-1 ${labelClass}`}>{labelText}</label>}
    {isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
  </>;
}

export function Modal({ children, open, onClose, classNames, noEscape }) {
  function handleClose() {
    document.body.classList.remove("overflow-hidden");
    onClose();
  }

  useEffect(() => {
    // console.log("key thingy");
    function handleKey(e) {
      if (e?.code !== "Escape" || noEscape) return;
      // console.log("escaped")
      handleClose();
      window.removeEventListener("keydown", handleKey);
    }

    window.addEventListener("keydown", handleKey);
    
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, handleClose]);

  if (open)
    document.body.classList.add("overflow-hidden");
  // document.body.classList.toggle("blur-sm", open);

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
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

export function Toggle({ enabled, onChange }) {
  const [on, setOn] = useState(!!enabled);

  return <div tabIndex="-1" className={`mb-2 rounded-full cursor-pointer ${on ? "bg-green-500" : "bg-neutral-400"} w-12 h-6 transition`} onClick={() => setOn(!on)}>
    <div className={`w-6 h-6 flex justify-center items-center ${on  && "translate-x-full"} transition-all`}>
      <div className="rounded-full bg-white w-3/4 h-3/4" />
    </div>
  </div>
}
