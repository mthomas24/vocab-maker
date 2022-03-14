import React, { useState } from 'react'
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { MainContainer } from "./Components";
import Header, { HeaderButton } from "./Header";
import { MdEdit, MdCopyAll, MdPrint } from "react-icons/md";

export default function ExportEditor({ terms }) {
  const [boldTerms, setBoldTerms] = useState(true);
  const [termSep, setTermSep] = useState({ str: " - ", custom: false });
  const [defSep, setDefSep] = useState({ str: "\n", custom: false });

  return (
    <>
    <Header>
      <HeaderButton txt="Edit Terms" to="/" Icn={MdEdit} />
      <HeaderButton txt="Copy to Clipboard" Icn={MdCopyAll} />
      <HeaderButton txt="Print" Icn={MdPrint} onClick={window.print} />
    </Header>
    <MainContainer>
      <Link
        className="mb-4 flex items-center gap-1 text-lg text-gray-800 w-fit
          px-1 py-0.5 pr-2 rounded-md hover:bg-gray-100/60 transition print:hidden"
        to="/"
      >
        <MdArrowBackIosNew className="inline-block text-sm" />
        Back
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-5 mb-6 leading-loose print:shadow-none
        print:bg-red-500 print:p-0 print:rounded">
        {terms.map((term, idx) => (
          <div key={term.id}>
            <p><span className={boldTerms ? "font-bold" : ""}>{term.word}</span>{termSep.str}{term.definition}</p>
          </div>
        ))}
      </div>
    </MainContainer>
    </>
  )
}
