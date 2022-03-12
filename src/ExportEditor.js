import React from 'react'
import { MdArrowBackIosNew } from "react-icons/md";

export default function ExportEditor({ terms, goBack }) {
  return (
    <>
    <button
      className="mb-4 flex items-center gap-1 text-lg text-gray-800
        px-1 py-0.5 pr-2 rounded-md hover:bg-gray-100/60 transition print:hidden"
      onClick={goBack}
    >
      <MdArrowBackIosNew className="inline-block text-sm" />
      Back
    </button>
    <div className="bg-white rounded-lg shadow-xl p-5 mb-6 leading-loose print:shadow-none
      print:bg-red-500 print:p-0 print:rounded">
      {terms.map((term, idx) => (
        <div key={term.id}>
          <p><span className="font-bold">{term.word}</span>&nbsp;- {term.definition}</p>
        </div>
      ))}
    </div>
    </>
  )
}
