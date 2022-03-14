import React, { useState } from "react";
import BulkAdd from "./BulkAdd";
import Header, { HeaderButton } from "./Header";
import { MainContainer, Modal, newTerm, TextInput } from "./Components";
import {
  MdClearAll,
  MdDownload,
  MdFilterList,
  MdUpload,
  MdDelete,
  MdDragIndicator
} from "react-icons/md";
import { motion, Reorder, useDragControls } from "framer-motion";

function TermCard({ term, idx, remove, update }) {
  const controls = useDragControls();

  return (
    <Reorder.Item value={term} dragControls={controls} dragListener={false}>
      <motion.div className="mb-5 bg-white rounded-lg p-4">
        <div className="flex items-center gap-2 text-gray-600">
          <h4 className="text-lg font-semibold mr-auto">{idx + 1}</h4>
          <MdDragIndicator
            className="w-5 h-5 hover:opacity-60 hover:cursor-grab transition"
            onPointerDown={e => controls.start(e)}
          />
          <MdDelete
            className="w-5 h-5 hover:opacity-60 hover:cursor-pointer transition"
            onClick={remove}
          />
        </div>
        <hr className="-mx-4 my-3" />
        <div className="flex gap-6 flex-wrap">
          <div className="flex-grow">
            <TextInput
              labelText="Word"
              placeholder="Enter a word..."
              inputClass="w-full"
              defaultVal={term.word}
              onBlur={e => update({ ...term, word: e.target.value })}
            />
          </div>
          <div className="flex-grow">
            <TextInput
              labelText="Definition"
              placeholder="Enter a definition..."
              inputClass="w-full"
              defaultVal={term.definition}
              onBlur={e => update({ ...term, definition: e.target.value })}
            />
          </div>
        </div>
      </motion.div>
    </Reorder.Item>
  );
}

export default function MainEditor({ terms, setTerms }) {
  const [bulkOpen, setBulkOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);

  return (
    <>
      <Header>
        <HeaderButton
          onClick={() => setTerms(prevT => prevT.filter(t => t.word || t.definition))}
          txt="Clear Blank Terms"
          Icn={MdFilterList}
        />
        <HeaderButton
          onClick={() => setClearOpen(true)}
          txt="Clear All"
          Icn={MdClearAll}
        />
        <Modal open={clearOpen} onClose={() => setClearOpen(false)} classNames="m-4">
          <div className="text-neutral-800">
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
      {bulkOpen && <BulkAdd setTerms={setTerms} onClose={() => setBulkOpen(false)} />}
      <MainContainer>
        <Reorder.Group values={terms} onReorder={setTerms}>
          {terms.map((t, idx) => (
            <TermCard
              term={t}
              idx={idx}
              key={t.id}
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
          <Reorder.Item as="div" className="bg-white rounded-lg p-5 flex justify-center 
              items-center text-lg w-full relative mb-5">
            <button
              className="border-b-emerald-300 border-b-4 pb-1 hover:px-4 transition-all duration-200 
                font-bold text-neutral-700 after:inset-0 after:absolute"
              onClick={() => setTerms(prevT => [...prevT, newTerm()])}>
              + New Term
            </button>
          </Reorder.Item>
        </Reorder.Group>
      </MainContainer>
    </>
  );
}