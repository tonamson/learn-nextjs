import Script from "next/script";
import "@/styles/oneui.css";
import type {Metadata} from 'next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
	title: 'Administrator',
	viewport: 'width=device-width,initial-scale=1.0',
}

export default function AdminLayout({children}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="remember-theme dark">
			<body>
				<main>
					{children}
					<ToastContainer />
				</main>
				<Script src="/assets/js/oneui.app.min.js"></Script>
				<Script src="/assets/js/lib/jquery.min.js"></Script>
			</body>
		</html>
	)
}