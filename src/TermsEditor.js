import React from 'react';
import { newTerm, TextInput } from "./Components";
import { MdDelete, MdDragIndicator } from "react-icons/md";


function TermCard({ term, idx, remove, update }) {
  return <div className="mb-5 bg-white rounded-lg p-4">
    <div className="flex items-center gap-2 text-gray-600">
      <h4 className="text-lg font-semibold mr-auto">{idx + 1}</h4>
      <MdDragIndicator className="w-5 h-5 hover:opacity-60 hover:cursor-grab transition" />
      <MdDelete className="w-5 h-5 hover:opacity-60 hover:cursor-pointer transition" onClick={remove} />
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
  </div>;
}

export default function TermsEditor({ terms, setTerms }) {
  return (
    <>
    {terms.map((t, idx) => <TermCard
      term={t}
      idx={idx}
      key={t.id}
      remove={() => setTerms(prevTerms => [
        ...prevTerms.slice(0, idx),
        ...prevTerms.slice(idx + 1, prevTerms.length)
      ])}
      update={newData => setTerms(prevT => [
        ...prevT.slice(0, idx),
        newData,
        ...prevT.slice(idx + 1, prevT.length)
      ])}
    />)}
    <div className="bg-white rounded-lg p-5 flex justify-center 
      items-center text-lg w-full relative mb-5">
      <button
        className="border-b-emerald-300 border-b-4 pb-1 hover:px-4 transition-all duration-200 
        font-bold text-neutral-700 after:inset-0 after:absolute"
        onClick={() => setTerms(prevT => [...prevT, newTerm()])}
      >+ New Term</button>
    </div>
    </>
  )
}
