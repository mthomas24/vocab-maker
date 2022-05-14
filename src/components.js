import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { v4 as uuid } from "uuid";
import { addModal, removeModal } from "./globalState";
import { AnimatePresence, motion } from "framer-motion";

export const newTerm = (wrd = "", def = "") => ({
  word: wrd,
  definition: def,
  id: uuid()
});

export function Radio({ children, group, checked, onChange, disabled }) {
  return (
    <label>
      <input
        className="mr-2 form-radio text-emerald-600 border-gray-300 focus:ring-emerald-600 focus:ring-1"
        type="radio"
        name={group}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </label>
  );
}

export const TextInputStyles = "rounded-md bg-gray-100 px-2 py-1 border focus:outline-none focus:ring-emerald-400 focus:ring-2";
export const LabelStyles = "block text-sm text-gray-500 bopacity-70 mb-1 z-0";

// export function TextInput({
//   labelText,
//   placeholder,
//   defaultVal,
//   labelClass,
//   inputClass,
//   isTextarea,
//   onChange,
//   onBlur
// }) {
//   let inputProps = {
//     className: `rounded-md bg-gray-100 px-2 py-1 border focus:outline-none focus:ring-emerald-400 focus:ring-2 ${inputClass}`,
//     type: "text",
//     defaultValue: defaultVal,
//     placeholder: placeholder,
//     onChange: onChange,
//     onBlur: onBlur
//   };

//   return (
//     <>
//       {labelText && (
//         <label className={`block text-sm text-gray-500 bopacity-70 mb-1 ${labelClass}`}>
//           {labelText}
//         </label>
//       )}
//       {isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
//     </>
//   );
// }

export function Modal({ children, open, onClose, classNames, noEscape }) {
  useEffect(() => {
    // console.log("key thingy");
    function handleKey(e) {
      if (e?.code !== "Escape" || noEscape) return;
      // console.log("escaped")
      onClose();
      window.removeEventListener("keydown", handleKey);
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, noEscape]);

  useEffect(() => {
    if (open) addModal();
    // else removeModal();
  }, [open]);


  return createPortal(
    <AnimatePresence exitBeforeEnter={true} onExitComplete={removeModal}>
      {open && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-black/50" onClick={onClose}
            // animate={{ opacity: 1 }}
            // initial={{ opacity: 0 }}
            // exit={{ opacity: 0 }}
            // transition={{ duration: 0.1 }}
          />
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <motion.div
              animate={{ scale: 1 }}
              initial={{ scale: 0.7 }}
              // exit={{ scale: 0.0 }}
              className={`bg-white rounded-xl p-6 pointer-events-auto ${classNames}`}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
}

export function Toggle({ defaultOn, onChange, disabled }) {
  const [on, setOn] = useState(!!defaultOn);

  return (
    <div
      tabIndex="-1"
      className={`mb-2 rounded-full cursor-pointer ${
        on ? "bg-green-500" : "bg-neutral-400"
      } ${disabled ? "opacity-30 pointer-events-none" : ""} w-12 h-6 transition`}
      onClick={() => {
        onChange(!on);
        setOn(!on);
      }}
    >
      <div
        className={`w-6 h-6 flex justify-center items-center ${
          on && "translate-x-full"
        } transition-all`}
      >
        <div className="rounded-full bg-white w-3/4 h-3/4" />
      </div>
    </div>
  );
}

export function MainContainer({ children }) {
  return (
    <div className="flex justify-center">
      <div className="mx-6 mt-6 max-w-screen-xl grow print:m-0">{children}</div>
    </div>
  );
}
