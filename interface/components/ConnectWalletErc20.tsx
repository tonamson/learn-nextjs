'use client'

import {createAppKit, useAppKit} from '@reown/appkit/react'
import {EthersAdapter} from '@reown/appkit-adapter-ethers'
import {mainnet, arbitrum} from '@reown/appkit/networks'
import {useState} from "react";
import { useDisconnect } from '@reown/appkit/react'

// 1. Get projectId at https://cloud.reown.com
const projectId = '2af411118080f5c031b70b8d83334bd6'

// 2. Create a metadata object
const metadata = {
	name: 'My Website',
	description: 'My Website description',
	url: 'https://mywebsite.com', // origin must match your domain & subdomain
	icons: ['https://avatars.mywebsite.com/']
}

// 3. Create the AppKit instance
const appKit = createAppKit({
	adapters: [new EthersAdapter()],
	metadata,
	networks: [mainnet, arbitrum],
	projectId,
	enableCoinbase: false,
	allWallets: 'HIDE',
	features: {
		socials: false,
		email: false,
		onramp: false,
		swaps: false,
		analytics: false,
		emailShowWallets: true
	}
})

export default function ConnectWalletErc20() {
	const {open} = useAppKit()
	const { disconnect } = useDisconnect()
	const [wallet, setWallet] = useState('Connect')
	const [isConnect, setIsConnect] = useState(false)
	
	appKit.subscribeAccount((account) => {
		if (account.isConnected && account.status === 'connected') {
			setWallet(String(account.address))
			setIsConnect(true)
		} else {
			setWallet('Connect')
			setIsConnect(false)
		}
	})
	
	return (
		<>
			<button className="btn btn-primary" onClick={() => open()}>{wallet}</button>
			{isConnect ? <button className="btn btn-primary ms-2" onClick={async () => await disconnect()}>Disconnect</button> : <></>}
		</>
	);
}