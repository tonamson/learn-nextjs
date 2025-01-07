import Footer from "@/components/page-content/footer";
import Header from "@/components/page-content/header";
import Intro from "@/components/page-content/intro";
import AboutUs from "@/components/page-content/about-us";
import HowToBuy from "@/components/page-content/how-to-buy";
import GetItNow from "@/components/page-content/get-it-now";
import BuyIt from "@/components/page-content/buy-token";

export default function Page() {
	return (
		<div>
			<Header/>
			<div className="layout-main position-relative" data-bs-spy="scroll" data-bs-target="#menu-scroll" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true">
				<Intro/>
				<AboutUs/>
				<HowToBuy/>
				<GetItNow/>
				<BuyIt/>
			</div>
			<Footer/>
		</div>
	);
}