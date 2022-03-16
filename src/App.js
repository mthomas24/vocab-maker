import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import MainEditor from "./MainEditor";
import ExportEditor from "./ExportEditor";
import { newTerm } from "./Components";

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

  useEffect(() => {
    localStorage.setItem("terms", JSON.stringify(terms));
  }, [terms]);

  useEffect(() => {
    document.body.classList.add(...("bg-gray-200 min-h-screen print:bg-transparent".split(" ")));
  }, []);

  
  return (
    <Routes>
      <Route path="/" element={<MainEditor terms={terms} setTerms={setTerms} />} />
      <Route path="/export" element={<ExportEditor terms={terms} />} />
    </Routes>
  );
}

export default App;
