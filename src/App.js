import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import MainEditor from "./MainEditor";
import ExportEditor from "./ExportEditor";
import { newTerm } from "./components";

function App() {
  const [terms, setTerms] = useState(() => {
    const localTerms = localStorage.getItem("terms");
    if (localTerms) {
      try {
        return JSON.parse(localTerms);
      } catch(e) {
        // console.log(e);
      }
    }

    return [
      // newTerm("John", "A very handsome and smart young man!"),
      newTerm("Ian", "A very intelligent young man!")
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
