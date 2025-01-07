'use client';

import '@solana/wallet-adapter-react-ui/styles.css';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {PhantomWalletAdapter} from "@solana/wallet-adapter-wallets";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
	async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
	{ ssr: false }
);

export default function ConnectWallet() {
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
		],
		[network]
	);
	
	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<WalletMultiButton />
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}