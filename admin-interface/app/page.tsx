import SideBar from "@/components/partials/sidebar";
import Header from "@/components/partials/header";
import Dashboard from "@/components/page-content/dashboard";

export default function HomePage(){
	return (
		<div id="page-container" className="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed main-content-narrow">
			<SideBar/>
			<Header/>
			<div id="main-container">
				<Dashboard/>
			</div>
		</div>
	)
}