'use client';

import dynamic from "next/dynamic";

const ConnectWallet = dynamic(
	() => import('@/components/ConnectWallet'),
	{
		ssr: false,
		loading: () => <div>Loading...</div>
	}
);

export default function Header() {
	
	return (
		<header className="fixed-top custom-header" id="header-wrap">
			<nav className="navbar navbar-expand-lg">
				<div className="container custom position-relative">
					<a className="navbar-brand" href="index.html">
						<img className="img-logo" src="/images/logo.svg" />
					</a>
					<button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
					<div className="offcanvas offcanvas-start" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
						<div className="offcanvas-header">
							<h5 className="offcanvas-title"><img className="img-logo" src="/images/logo.svg"/></h5>
							<button className="btn p-0 border-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"><i className="fa-solid fa-times text-white fa-2x"></i></button>
						</div>
						<div className="offcanvas-body">
							<ul className="navbar-nav justify-content-end flex-grow-1 pe-3" id="menu-scroll">
								<li className="nav-item"><a className="nav-link active" href="#home">HOME</a></li>
								<li className="nav-item" data-bs-dismiss="offcanvas"><a className="nav-link" href="#about-us">ABOUT US</a></li>
								<li className="nav-item" data-bs-dismiss="offcanvas"><a className="nav-link" href="#tokenomics">TOKENOMICS</a></li>
								<li className="nav-item" data-bs-dismiss="offcanvas"><a className="nav-link" href="#faq">FAQ</a></li>
								<li className="nav-item" data-bs-dismiss="offcanvas"><a className="nav-link" href="#contact">CONTACT</a></li>
							</ul>
						</div>
					</div>
					<div className="action-right d-flex align-items-center">
						<ConnectWallet/>
					</div>
				</div>
			</nav>
		</header>
	)
}