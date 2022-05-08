import { Link } from "react-router-dom";

export function HeaderButton({ onClick, txt, Icn, to }) {
  const props = {
    className:
      "rounded-sm px-1 md:px-2 py-1 bg-emerald-700 text-white hover:bg-emerald-600 transition focus:outline-none focus:ring-white focus:ring-2 select-none flex items-center gap-1",
    onClick: onClick,
    children: (
      <>
        <p className="hidden md:inline-block">{txt}</p>
        {Icn && <Icn className="w-5 h-5 inline-block" />}
      </>
    )
  };

  return to ? <Link {...props} to={to} /> : <button {...props} />;
}

export default function Header({ children }) {
  return (
    <header className="flex justify-end items-stretch gap-3 p-3 bg-emerald-500 text-white print:hidden">
      {children}
    </header>
  );
}
