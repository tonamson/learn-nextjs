'use client'

import {createAppKit, useAppKit} from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum } from '@reown/appkit/networks'

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
createAppKit({
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
	const { open } = useAppKit()

	return (
		<>
			<button className="btn btn-primary" onClick={() => open()}>Connect</button>
		</>
	);
}