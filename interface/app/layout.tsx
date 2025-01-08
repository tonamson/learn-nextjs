import '@/styles/bootstrap.min.css'

import type {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Wallet connect',
	description: 'Wallet connect',
	icons: "/images/logo-sm.svg",
	viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
}

export default function DashboardLayout({children}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	)
}