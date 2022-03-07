import type { AppProps } from 'next/app';
import { init_i18n } from '../lib/i18n';
import { isServer } from '../lib/isServer';
import '../styles/globals.css';

if (!isServer) {
	init_i18n();
}

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
