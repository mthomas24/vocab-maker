import { Modal } from "./Components";
import { useState } from "react";
import {
  MdClearAll,
  MdDownload,
  MdFilterList,
  MdUpload,
  MdEdit,
  MdCopyAll,
  MdPrint
} from "react-icons/md";

function HeaderButton({ onClick, txt, Icn }) {
  return (
    <button
      className="rounded-sm px-1 md:px-2 py-1 bg-emerald-700 text-white 
      hover:bg-emerald-600 transition select-none flex items-center gap-1"
      onClick={onClick}
    >
      <p className="hidden md:inline-block">{txt}</p>
      {Icn && <Icn className="w-5 h-5 inline-block" />}
    </button>
  );
}

export default function Header({
  setTerms,
  setBulkOpen,
  setIsExporting,
  exportControls
}) {
  const [clearOpen, setClearOpen] = useState(false);

  return (
    <header className="flex justify-end items-stretch gap-3 p-3 bg-emerald-500 text-white print:hidden">
      {!exportControls ? (
        <>
          {/* <HeaderButton
      onClick={() => setTerms(prevTerms => [...prevTerms, newTerm])}
      txt="New Term"
      Icn={MdAdd}
    /> */}
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
                Are you sure you want to delete all the terms? This action cannot be
                undone.
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
          <HeaderButton
            onClick={() => setIsExporting(true)}
            txt="Export"
            Icn={MdDownload}
          />
        </>
      ) : (
        <>
          <HeaderButton txt="Edit Terms" Icn={MdEdit} />
          <HeaderButton txt="Copy to Clipboard" Icn={MdCopyAll} />
          <HeaderButton txt="Print" Icn={MdPrint} onClick={window.print} />
        </>
      )}
    </header>
  );
}
