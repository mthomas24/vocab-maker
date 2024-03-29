import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { Toggle, Radio } from "./components";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";

const DEF_SEPS = {
  ":": ": ",
  "-": " - "
};

const TERM_SEPS = {
  ",": ", "
};

export default function BulkAdd({ setTerms, onClose, open }) {
  const [termSep, setTermSep] = useState({ str: "\n", custom: false });
  const [defSep, setDefSep] = useState({ str: "-", custom: false });
  const [addDefs, setAddDefs] = useState(false);

  const termsInput = useRef();
  const termSepInput = useRef();
  const defSepInput = useRef();

  /**
   *
   * @param {any[]} terms
   */
  const getDefinitions = terms =>
    new Promise(resolve => {
      let requests = 0;
      let termsCopy = JSON.parse(JSON.stringify(terms));
      for (const term of termsCopy) {
        if (!term.definition) {
          requests++;
          fetch(
            `https://api.yodacode.xyz/explain/${encodeURIComponent(term.word)}?limit=1`
          )
            .then(res => res.json())
            .then(data => {
              if (data.type !== "error") term.definition = data.value;
              requests--;

              if (requests === 0) resolve(termsCopy);
            });
        }
      }
    });

  async function handleSubmit(evt) {
    evt.preventDefault();

    let result = [];
    for (const s of termsInput.current.value.split(termSep.str)) {
      let sArray = s.split(defSep.str);
      let newT = {
        word: sArray.shift().trim(),
        definition: sArray.join(defSep.str).trim(),
        id: uuid()
      };
      if (newT.word) result.push(newT);
    }

    console.table(result);

    if (addDefs)
      result = await getDefinitions(result);

    console.table(result);

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

  if (!open) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
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
          <textarea
            className="min-h-[10em] w-full border rounded-md p-3"
            placeholder={placeholder}
            ref={termsInput}
          />

          <p className="text-gray-600 mb-4 text-sm">
            *Whitespace before and after terms/definitions will be removed.
          </p>

          <div className="text-gray-700 mt-2 flex gap-x-16 gap-y-4 flex-wrap items-center">
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
                  onChange={() =>
                    setTermSep({
                      str: termSepInput.current.value || termSep.str,
                      custom: true
                    })
                  }
                  group="between-terms"
                >
                  <input
                    type="text"
                    ref={termSepInput}
                    defaultValue={termSep.custom ? termSep.str : undefined} // maybe just set this with the ref when the component mounts
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
                  onChange={() =>
                    setDefSep({
                      str: defSepInput.current.value || defSep.str,
                      custom: true
                    })
                  }
                >
                  <input
                    type="text"
                    ref={defSepInput}
                    defaultValue={defSep.custom ? defSep.str : undefined}
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
              <p className="font-bold mb-1">Search for Definitions</p>
              <Toggle defaultOn={addDefs} onChange={setAddDefs} />
            </div>

            <button
              className="ml-auto bg-emerald-600 text-white text-lg px-6 py-2 
            rounded hover:bg-emerald-600/70 transition"
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
