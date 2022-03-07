import { useStore } from 'effector-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import Header from '../components/Header';
import IconPanel from '../components/IconPanel/IconPanel';
import { ICON_SETS } from '../constants';
import { useLS } from '../hooks/useLS';
import { $setIcon } from '../store/iconEditor';
import { $fetchCollectionsFx, $iconsStore } from '../store/icons';
import { $uiStore } from '../store/ui';

const Home: NextPage = () => {
	const uiStore = useStore($uiStore);
	const iconsStore = useStore($iconsStore);
	const loadingCollection = useStore($fetchCollectionsFx.pending);

	const [search, setSearch] = useLS('search', '');

	const filteredIcons = useMemo(() => {
		return iconsStore.icons.filter(
			({ name, tags }) =>
				name.includes(search.toLowerCase()) ||
				(tags || []).some((tag) => tag.includes(search.toLowerCase()))
		);
	}, [iconsStore.icons, search]);

	useEffect(() => {
		$fetchCollectionsFx(ICON_SETS.feather.key);
	}, []);

	return (
		<>
			<Head>
				<title>Iconest</title>
				<meta name="description" content="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header search={search} setSearch={setSearch} />
			<main className="gap-4 p-4 pt-20 dark">
				<IconPanel />
				<div
					className="grid gap-4 pl-80"
					style={{
						gridTemplateColumns: `repeat(auto-fill, minmax(${uiStore.iconLayoutSize}px,1fr))`,
					}}
				>
					{loadingCollection && (
						<div className="flex items-center justify-center w-full rounded cursor-pointer text-slate-100 grow hover:border bg-slate-500">
							Loading
						</div>
					)}
					{filteredIcons.map((icon, i) => (
						<div
							onClick={() => $setIcon(icon)}
							key={i}
							dangerouslySetInnerHTML={{ __html: icon.svg }}
							className="flex items-center justify-center rounded cursor-pointer aspect-square hover:border hover:bg-slate-200 bg-slate-100 "
						></div>
					))}
				</div>
			</main>
		</>
	);
};

export default Home;
