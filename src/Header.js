import { Modal, TextInput } from "./Components";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { MdAdd, MdDownload, MdFilterList, MdUpload } from "react-icons/md";

function HeaderButton({ onClick, txt, Icn }) {
  return (
    <button
      className="rounded-sm px-1 sm:px-2 py-1 bg-emerald-700 text-white 
      hover:bg-emerald-600 transition select-none flex items-center gap-0.5"
      onClick={onClick}
    >
      <p className="hidden sm:inline-block">{txt}</p>
      {Icn && <Icn className="w-5 h-5 inline-block" />}
    </button>
  );
}

export default function Header({ setTerms }) {
  const [bulkOpen, setBulkOpen] = useState(false);

  return <header className="flex justify-end items-stretch gap-3 p-3 bg-emerald-500 text-white">
    <HeaderButton
      onClick={() => setTerms(prevTerms => [...prevTerms, { word: "", definition: "", id: uuid() }])}
      txt="New Term"
      Icn={MdAdd}
    />
    <HeaderButton
      onClick={() => setTerms(prevT => prevT.filter(t => (t.word || t.definition)))}
      txt="Clear Blank Terms"
      Icn={MdFilterList}
    />
    <HeaderButton
      onClick={() => setBulkOpen(true)}
      txt="Bulk Add"
      Icn={MdUpload}
    />
    <Modal open={bulkOpen} onClose={() => setBulkOpen(false)} classNames="w-9/12 h-4/6">
      <div className="flex flex-col h-full">
        <TextInput
          isTextarea={true}
          placeholder="Enter some words..."
          labelText="Words"
          inputClass="w-full resize-none flex-grow"
        />
      </div>
    </Modal>
    <HeaderButton onClick={() => window.print()}
      txt="Export"
      Icn={MdDownload}
    />
  </header>
}