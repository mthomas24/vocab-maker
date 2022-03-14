import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { Toggle } from "./Components";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";

function Radio({ children, group, checked, onChange, disabled }) {
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

const DEF_SEPS = {
  ":": ": ",
  "-": " - "
};

const TERM_SEPS = {
  ",": ", "
};

export default function BulkAdd({ setTerms, onClose }) {
  const [termSep, setTermSep] = useState({ str: "\n", custom: false });
  const [defSep, setDefSep] = useState({ str: "-", custom: false });

  const termsInput = useRef();

  async function handleSubmit(evt) {
    evt.preventDefault();

    let result = [];
    for (const s of termsInput.current.value.split(termSep.str)) {
      let sArray = s.split(defSep.str, 2);
      let newT = {
        word: sArray[0].trim(),
        definition: sArray.length >= 2 ? sArray[1].trim() : "",
        id: uuid()
      };
      if (newT.word && newT.definition) result.push(newT);
    }

    if (result.length) {
      setTerms(prevT => [...prevT, ...result]);
      onClose();
    }
  }

  const placeholder = Array.from({ length: 2 })
    .map(
      (_, idx) =>
        `Term${idx + 1}${DEF_SEPS[defSep.str] || defSep.str}Definition${idx + 1}`
    )
    .join(TERM_SEPS[termSep.str] || termSep.str);

  return (
    <motion.div
      className="bg-emerald-50 p-6 border-b border-gray-300"
    >
      <MdClose
        className="ml-auto w-6 h-6 text-gray-600 hover:text-gray-600/60 transition cursor-pointer -mb-2"
        onClick={onClose}
      />
      <div>
        <form className="w-full max-w-screen-xl mx-auto" onSubmit={handleSubmit}>
          <label className="text-gray-500 text-lg block mb-1">
            Copy paste some data here.
          </label>
          {/* <TextInput placeholder="Enter some words..." isTextarea inputClass="resize-none w-full max-w-screen-xl" /> */}
          <textarea
            className="min-h-[10em] w-full border rounded-md p-3"
            placeholder={placeholder}
            ref={termsInput}
          />

          <p className="text-gray-600 mb-4 text-sm">
            *Whitespace before and after terms/definitions will be removed.
          </p>

          <div className="text-gray-700 mt-2 flex gap-x-16 gap-y-2 flex-wrap items-center">
            <div>
              <p className="font-bold">Between terms</p>
              <div className="flex gap-6 items-center">
                <Radio
                  checked={!termSep.custom && termSep.str === "\n"}
                  onChange={() => setTermSep({ str: "\n", custom: false })}
                  group="between-terms"
                >
                  New Line
                </Radio>
                <Radio
                  checked={!termSep.custom && termSep.str === ","}
                  onChange={() => setTermSep({ str: ",", custom: false })}
                  group="between-terms"
                >
                  Comma
                </Radio>
                <Radio
                  checked={termSep.custom}
                  onChange={() => setTermSep({ ...termSep, custom: true })}
                  group="between-terms"
                >
                  <input
                    type="text"
                    className="border rounded-md px-2 py-1 w-16"
                    onChange={evt => {
                      if (!termSep.custom) return;
                      if (!evt.target.value) return;
                      setTermSep({ ...termSep, str: evt.target.value });
                    }}
                  />
                </Radio>
              </div>
            </div>

            <div>
              <p className="font-bold">Between term &amp; definition</p>
              <div className="flex gap-6 items-center">
                <Radio
                  checked={!defSep.custom && defSep.str === "-"}
                  group="term-def"
                  onChange={() => setDefSep({ str: "-", custom: false })}
                >
                  Dash
                </Radio>
                <Radio
                  checked={!defSep.custom && defSep.str === "\t"}
                  group="term-def"
                  onChange={() => setDefSep({ str: "\t", custom: false })}
                >
                  Tab
                </Radio>
                <Radio
                  checked={!defSep.custom && defSep.str === ":"}
                  group="term-def"
                  onChange={() => setDefSep({ str: ":", custom: false })}
                >
                  Colon
                </Radio>
                <Radio
                  checked={defSep.custom}
                  group="term-def"
                  onChange={() => setDefSep({ ...defSep, custom: true })}
                >
                  <input
                    type="text"
                    className="border rounded-md px-2 py-1 w-16"
                    onChange={evt => {
                      if (!defSep.custom) return;
                      if (!evt.target.value) return;
                      setDefSep({ ...defSep, str: evt.target.value });
                    }}
                  />
                </Radio>
              </div>
            </div>

            <div>
              <p className="font-bold mb-1">Add definitions</p>
              <Toggle disabled />
            </div>

            <button
              className="ml-auto bg-emerald-600 text-white text-lg px-6 py-2 
            rounded-full hover:bg-emerald-600/70 transition"
              type="submit"
            >
              Add Terms
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
