import { useEffect, useState } from 'react';
import { TextInput, newTerm, Toggle } from "./Components";
import { MdDelete, MdDragIndicator, MdClose } from "react-icons/md";
import Header from "./Header";
import BulkAdd from "./BulkAdd";

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

function App() {
  const [terms, setTerms] = useState(() => {
    const localTerms = localStorage.getItem("terms");
    if (localTerms) {
      try {
        return JSON.parse(localTerms);
      } catch(e) {
        console.log(e);
      }
    }
    return [
      newTerm("dad", "no es tu madre"),
      newTerm("mom", "ur mom gae"),
      newTerm("john", "a very handsome, smooth, and attractive young man!")
    ];
  });
  const [bulkOpen, setBulkOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   console.log("Dark mode: " + darkMode);
  //   document.body.classList.toggle("dark", darkMode);
  //   localStorage.setItem("darkMode", darkMode);
  // }, [darkMode]);

  useEffect(() => {
    document.body.classList.add(...("bg-gray-200 min-h-screen".split(" ")));
  }, []);

  useEffect(() => {
    localStorage.setItem("terms", JSON.stringify(terms));
  }, [terms]);

  // const themeToggleProps = {
  //   className: "w-7 h-7 hover:opacity-60 hover:cursor-pointer text-emerald-700 transition",
  //   onClick: () => setDarkMode(prevD => !prevD)
  // };
  
  return (
    <>
      {!isExporting &&
        <Header setTerms={setTerms} setIsExporting={setIsExporting} setBulkOpen={setBulkOpen} />
      }
      {(bulkOpen && !isExporting) &&
        <BulkAdd setTerms={setTerms} onClose={() => setBulkOpen(false)} />
      }
      <div className="flex justify-center">
        <div className="mx-6 mt-6 max-w-screen-xl grow">
          {/* <Toggle /> */}
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
        </div>
      </div>
    </>
  );
}

export default App;
