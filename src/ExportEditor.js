import React, { useState } from "react";
import { MainContainer } from "./components";
import Header, { HeaderButton } from "./Header";
import { MdEdit, MdCopyAll, MdPrint } from "react-icons/md";
import { Listbox } from "@headlessui/react";

function Select({ val, onChange, options, label }) {
  return (
    <Listbox as="div" className="w-64 relative" value={val} onChange={onChange}>
      <p className="font-bold mb-1">{label}</p>
      <Listbox.Button className="border border-gray-300 capitalize rounded-md bg-gray-50 py-1.5 w-full text-left px-3 relative focus:outline-none focus:ring-emerald-400 focus:ring-2">
        <span className="truncate">{val}</span>
        <span className="h-full flex items-center absolute right-2 top-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-gray-400"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </Listbox.Button>
      <Listbox.Options
        as="div"
        className="bg-gray-50 py-1 rounded-md mt-2 absolute shadow-md w-full focus:outline-none"
      >
        {options.map(s => (
          <Listbox.Option
            className={({ active, selected }) =>
              `capitalize list-none px-6 py-1 hover:cursor-pointer ${
                active ? "bg-emerald-100 text-emerald-900" : ""
              } ${selected ? "font-semibold" : ""}`
            }
            key={s}
            value={s}
          >
            {s}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

function ListElem({ style, children, className }) {
  let props = {
    className,
    children
  };

  return {
    none: <ul {...props} />,
    bullets: <ul {...props} />,
    numbers: <ol {...props} />
  }[style];
}

export default function ExportEditor({ terms }) {
  const [termStyle, setTermStyle] = useState("bold"); // "none" | "bold" | "italic" | "underline"
  const [listStyle, setListStyle] = useState("none"); // "none" | "numbers" | "bullets"
  const [termSep, setTermSep] = useState("dash"); // "dash" | "colon"
  const [fontSize, setFontSize] = useState("16px");

  const TERM_SEPS = { dash: " - ", colon: ": " };

  return (
    <>
      <Header>
        <HeaderButton txt="Edit Terms" to="/" Icn={MdEdit} />
        <HeaderButton
          txt="Copy to Clipboard"
          onClick={() =>
            navigator.clipboard.writeText(
              terms.map(t => t.word + TERM_SEPS[termSep] + t.definition).join("\n")
            )
          }
          Icn={MdCopyAll}
        />
        <HeaderButton txt="Print" Icn={MdPrint} onClick={window.print} />
      </Header>
      <MainContainer>
        {/* <Link
          className="mb-4 flex items-center gap-1 text-lg text-gray-800 w-fit
          px-1 py-0.5 pr-2 rounded-md hover:bg-gray-100/60 transition print:hidden"
          to="/"
        >
          <MdArrowBackIosNew className="inline-block text-sm" />
          Back
        </Link> */}

        <div className="print:hidden flex flex-wrap gap-x-16 gap-y-4 mb-8">
          <Select
            onChange={setTermStyle}
            val={termStyle}
            label="Term Style"
            options={["none", "bold", "underline", "italic"]}
          />
          <Select
            onChange={setListStyle}
            val={listStyle}
            label="List Style"
            options={["none", "numbers", "bullets"]}
          />
          <Select
            onChange={setTermSep}
            val={termSep}
            label="Between Terms &amp; Definitions"
            options={["dash", "colon"]}
          />
          <Select
            onChange={setFontSize}
            val={fontSize}
            label="Font Size"
            options={[
              "12px",
              "14px",
              "16px",
              "18px",
              "20px",
              "22px",
              "24px",
              "28px",
              "32px"
            ]}
          />
        </div>

        <ListElem
          style={listStyle}
          className="bg-white rounded-lg shadow-lge p-5 mb-6 leading-loose print:shadow-none
        print:p-0 print:rounded"
        >
          {terms.map((term, idx) => (
            <li
              key={term.id}
              style={{ fontSize: fontSize }}
              className={
                {
                  none: "",
                  bullets: "list-inside list-disc",
                  numbers: "list-inside list-decimal"
                }[listStyle]
              }
            >
              <span
                className={
                  { bold: "font-bold", underline: "underline", italic: "italic" }[
                    termStyle
                  ]
                }
              >
                {term.word}
              </span>
              {TERM_SEPS[termSep]}
              {term.definition}
            </li>
          ))}
        </ListElem>
      </MainContainer>
    </>
  );
}
