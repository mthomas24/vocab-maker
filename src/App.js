import { useEffect, useState } from 'react';
import './App.css';
import { TextInput } from "./Components";
import { MdDelete, MdDragIndicator } from "react-icons/md";
import { v4 as uuid } from "uuid";
import Header from "./Header";

function TermCard({ term, idx, remove }) {
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
        />
      </div>
      <div className="flex-grow">
        <TextInput
          labelText="Definition"
          placeholder="Enter a definition..."
          inputClass="w-full"
          defaultVal={term.definition}
        />
      </div>
    </div>
  </div>;
}

function App() {
  const [terms, setTerms] = useState([
    { word: "dad", definition: "no es tu madre", id: uuid() },
    { word: "mom", definition: "ur mom gae", id: uuid() },
    { word: "john", definition: "a very handsome, smooth, and attractive young man!", id: uuid() }
  ]);
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   console.log("Dark mode: " + darkMode);
  //   document.body.classList.toggle("dark", darkMode);
  //   localStorage.setItem("darkMode", darkMode);
  // }, [darkMode]);

  useEffect(() => {
    document.body.classList.add(...("bg-gray-200 min-h-screen".split(" ")));
  }, []);

  // const themeToggleProps = {
  //   className: "w-7 h-7 hover:opacity-60 hover:cursor-pointer text-emerald-700 transition",
  //   onClick: () => setDarkMode(prevD => !prevD)
  // };
  
  return (
    <>
      <Header setTerms={setTerms} />
      <div className="px-6 md:px-10 mt-6">
        {terms.map((t, idx) => <TermCard
          term={t}
          idx={idx}
          key={t.id}
          remove={() => setTerms(prevTerms => [
            ...prevTerms.slice(0, idx),
            ...prevTerms.slice(idx + 1, prevTerms.length)
          ])}
        />)}
        <div className="bg-white rounded-lg p-5 flex justify-center 
          items-center text-lg w-full relative">
          <button
            className="border-b-emerald-300 border-b-4 pb-1 hover:px-4 transition-all duration-200 
            font-bold text-neutral-700 after:inset-0 after:absolute"
          >+ New Term</button>
        </div>
      </div>
    </>
  );
}

export default App;
