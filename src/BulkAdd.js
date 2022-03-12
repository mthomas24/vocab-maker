import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { Toggle } from "./Components";

function Radio({ children, group, checked, onChange, disabled }) {
  return (
    <label className="">
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

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  const placeholder = Array.from({ length: 2 })
    .map(
      (_, idx) =>
        `Term${idx + 1}${DEF_SEPS[defSep.str] || defSep.str}Definition${idx + 1}`
    )
    .join(TERM_SEPS[termSep.str] || termSep.str);

  console.log(placeholder);

  return (
    <div className="bg-emerald-50 p-6 border-b border-gray-300">
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
            className="min-h-[6em] w-full border rounded-md p-3"
            placeholder={placeholder}
          />

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
              <Toggle />
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
    </div>
  );
}
