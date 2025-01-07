import '@/styles/bootstrap.min.css'
import '@/styles/fancybox.css'
import '@/styles/animate.css'
import '@/styles/style.css'
import Script from 'next/script'

import type {Metadata} from 'next'

export const metadata: Metadata = {
	title: 'Rabbit Token',
	description: 'Rabbit Token',
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
				<Script src="/js/jquery.min.js" strategy="lazyOnload"></Script>
				<Script src="/js/bootstrap.bundle.min.js" strategy="lazyOnload"></Script>
				<Script src="/js/fancybox.umd.js"></Script>
				<Script src="/js/wow.min.js"></Script>
				<Script src="/js/main.js" strategy="lazyOnload"></Script>
			</body>
		</html>
	)
}