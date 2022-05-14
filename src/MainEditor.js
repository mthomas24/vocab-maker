import React, { useEffect, useRef, useState } from "react";
import BulkAdd from "./BulkAdd";
import Header, { HeaderButton } from "./Header";
import {
  LabelStyles,
  MainContainer,
  Modal,
  newTerm,
  TextInputStyles
} from "./components";
import {
  MdClearAll,
  MdDownload,
  MdUpload,
  MdDelete,
  MdDragIndicator,
  MdFilterListAlt
} from "react-icons/md";
import { motion, Reorder, useDragControls } from "framer-motion";
import { Combobox } from "@headlessui/react";

function DefinitionInput({ term, update }) {
  const [text, setText] = useState(term.definition);
  const [choices, setChoices] = useState([]);
  // const [choicesOpen, setChoicesOpen] = useState(false);
  const btn = useRef();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    console.log(term.word);
    populateChoices();
  }, [term.word])

  function populateChoices() {
    // console.log("made requests for: " + term.word); return;
    fetch(`https://api.yodacode.xyz/explain-v2/${encodeURIComponent(term.word)}?limit=4`)
      .then(res => res.json())
      .then(data => !data.error && setChoices(data.results.filter(r => r.value).map(r => r.value)));
  }

  // function truncateString(str, maxLen) {
  //   if (str.length <= maxLen - 3) return str;
  //   return str.substring(0, maxLen) + "...";
  // }

  return (
    <>
    <label className={LabelStyles}>Definition</label>
    <Combobox value={text} onChange={setText}>
      {/* Allows opening combobox options when the input is focused */}
      <Combobox.Button className="hidden" ref={btn} />
      <Combobox.Input
        role=""
        className={TextInputStyles + " w-full"}
        onChange={e => setText(e.target.value)}
        onBlur={e => update({ ...term, definition: e.target.value })}
        onFocus={() => {
          !choices.length && populateChoices();
          !text && btn?.current.click();
        }}
      />
      <Combobox.Options unmount={false} className="w-full rounded-md z-10">
        {choices.filter(c => c.toLowerCase().includes(text.toLowerCase())).map(c => (
          <Combobox.Option className={({ active }) => "truncate hover:cursor-pointer mt-2 px-4 py-1.5 rounded " + (active ? "bg-emerald-100 text-emerald-900" : "bg-gray-100")} key={c} value={c}>
            {c}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
    </>
  );

  // return <TextInput
  //   labelText="Definition"
  //   placeholder="Enter a definition..."
  //   onBlur={e => update({ ...term, definition: e.target.value })}
  // />
}

function TermCard({ term, idx, remove, update, shouldAnimate }) {
  const controls = useDragControls();

  const [beingDragged, setBeingDragged] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("select-none", beingDragged);
  }, [beingDragged]);

  return (
    <Reorder.Item
      value={term}
      dragControls={controls}
      dragListener={false}
      onDragEnd={() => {
        console.log("drag ended");
        setBeingDragged(false);
      }}
      onDragStart={() => setBeingDragged(true)}
    >
      <motion.form
        autoComplete="off"
        onSubmit={e => e.preventDefault()}
        animate={shouldAnimate && { scale: 1, opacity: 1 }}
        initial={shouldAnimate && { scale: 0.8, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={`mb-5 bg-white rounded-lg p-4 transition duration-200 ${
          beingDragged ? "shadow-lg" : ""
        }`}
        style={{ transitionProperty: "box-shadow" }}
      >
        <div className="flex items-center gap-2 text-gray-600">
          <h4 className="text-lg font-semibold mr-auto">{idx + 1}</h4>
          <button onPointerDown={e => controls.start(e)} aria-label="Drag Card">
            <MdDragIndicator className="w-5 h-5 hover:opacity-60 hover:cursor-grab transition" />
          </button>
          <button onClick={remove} aria-label="Delete Card">
            <MdDelete className="w-5 h-5 hover:opacity-60 hover:cursor-pointer transition" />
          </button>
        </div>
        <hr className="-mx-4 my-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-wrap">
          <div className="flex-grow">
            <label className={LabelStyles}>Word</label>
            <input
              placeholder="Enter a word..."
              className={TextInputStyles + " w-full"}
              defaultValue={term.word}
              onBlur={e => update({ ...term, word: e.target.value })}
            />
          </div>
          <div className="flex-grow relative">
            <DefinitionInput term={term} update={update} />
          </div>
        </div>
      </motion.form>
    </Reorder.Item>
  );
}

export default function MainEditor({ terms, setTerms }) {
  const [bulkOpen, setBulkOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  const shouldAnimateCards = useRef(false);

  useEffect(() => {
    shouldAnimateCards.current = true;
  }, [terms]);

  return (
    <>
      <Header>
        <HeaderButton
          onClick={() => setTerms(prevT => prevT.filter(t => t.word || t.definition))}
          txt="Clear Blank Terms"
          Icn={MdFilterListAlt}
        />
        <HeaderButton
          onClick={() => setClearOpen(true)}
          txt="Clear All"
          Icn={MdClearAll}
        />
        <Modal open={clearOpen} onClose={() => setClearOpen(false)} classNames="m-4">
          <div className="text-gray-800">
            <p className="mb-6">
              Are you sure you want to delete all the terms? This action cannot be undone.
            </p>
            <div className="flex justify-end items-stretch gap-3">
              <button
                className="font-semibold hover:underline"
                onClick={() => setClearOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 rounded-sm px-4 py-1.5 text-white hover:bg-red-500/80 transition"
                onClick={() => {
                  setTerms([]);
                  setClearOpen(false);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </Modal>
        <HeaderButton
          onClick={() => setBulkOpen(prev => !prev)}
          txt="Bulk Add"
          Icn={MdUpload}
        />
        <HeaderButton txt="Export" to="/export" Icn={MdDownload} />
      </Header>

      <BulkAdd setTerms={setTerms} onClose={() => setBulkOpen(false)} open={bulkOpen} />

      <MainContainer>
        <Reorder.Group values={terms} onReorder={setTerms}>
          {terms.map((t, idx) => (
            <TermCard
              term={t}
              idx={idx}
              key={t.id}
              shouldAnimate={shouldAnimateCards.current}
              remove={() =>
                setTerms(prevTerms => [
                  ...prevTerms.slice(0, idx),
                  ...prevTerms.slice(idx + 1, prevTerms.length)
                ])
              }
              update={newData =>
                setTerms(prevT => [
                  ...prevT.slice(0, idx),
                  newData,
                  ...prevT.slice(idx + 1, prevT.length)
                ])
              }
            />
          ))}
          <Reorder.Item
            drag={false}
            as="div"
            className="bg-white rounded-lg p-5 flex justify-center 
              items-center text-lg w-full relative mb-5"
          >
            <button
              className="border-b-emerald-300 border-b-4 pb-1 hover:px-4 transition-all duration-200 
                font-bold text-gray-700 after:inset-0 after:absolute"
              onClick={() => setTerms(prevT => [...prevT, newTerm()])}
            >
              + New Term
            </button>
          </Reorder.Item>
        </Reorder.Group>
      </MainContainer>
    </>
  );
}
