import React from 'react';

type Props = {
	search: string;
	setSearch: (v: string) => void;
};

const Header = ({ search, setSearch }: Props) => {
	return (
		<header className="fixed flex items-center w-full h-16 p-4 bg-gray-900">
			<div className="flex items-center pl-4 mr-6 sm:mr-0 sm:w-80">
				<h1 className="text-lg font-bold text-white">ICONOFEST</h1>
			</div>
			<div className="grow">
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search icons"
					className="max-w-[320px] h-full p-2 rounded placeholder-slate-500 bg-slate-100"
					type="text"
				/>
			</div>
		</header>
	);
};

export default Header;
