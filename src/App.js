import { useEffect, useRef, useState } from 'react';
import { TextInput, newTerm } from "./Components";
import Header from "./Header";
import BulkAdd from "./BulkAdd";
import TermsEditor from "./TermsEditor";
import ExportEditor from "./ExportEditor";

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
  // const getTermStr = useRef(() => terms.map(t => `${t.term}-${t.definition}`));
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
      <Header setTerms={setTerms} setIsExporting={setIsExporting} setBulkOpen={setBulkOpen} exportControls={isExporting} />
      {(bulkOpen && !isExporting) &&
        <BulkAdd setTerms={setTerms} onClose={() => setBulkOpen(false)} />
      }
      <div className="flex justify-center">
        <div className="mx-6 mt-6 max-w-screen-xl grow print:m-0">
          {isExporting ? 
            <ExportEditor terms={terms.filter(t => t.word && t.definition)} goBack={() => setIsExporting(false)} />
          :
            <TermsEditor terms={terms} setTerms={setTerms} />
          }
        </div>
      </div>
    </>
  );
}

export default App;
