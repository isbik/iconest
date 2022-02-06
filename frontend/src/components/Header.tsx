import React from "react";

type Props = {
  search: string;
  setSearch: (v: string) => void;
};

const Header = ({ search, setSearch }: Props) => {
  return (
    <header className="flex items-center fixed w-full h-16 p-4 bg-slate-900">
      <div className="w-80 flex items-center pl-4">
        <h1 className="text-white font-bold  text-lg">ICONOFEST</h1>
      </div>
      <div className="grow">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons"
          className="p-2 h-full w-full rounded placeholder-slate-500 bg-slate-100"
          type="text"
        />
      </div>
    </header>
  );
};

export default Header;
