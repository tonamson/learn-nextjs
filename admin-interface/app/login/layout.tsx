import {ToastContainer} from "react-toastify";
import Script from "next/script";


export default function AuthLayout({children,}: { children: React.ReactNode }) {
	return (
		<main>
			<div id="page-container">
				<div id="main-container">{children}</div>
			</div>
			<ToastContainer/>
		</main>
	)
}