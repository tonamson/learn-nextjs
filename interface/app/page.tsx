import ConnectWalletSolana from "@/components/ConnectWalletSolana";
import "@/components/ConnectWalletErc20";
import ConnectWalletErc20 from "@/components/ConnectWalletErc20";
import ManipulateNumberZustand from "@/components/zustand/ManipulateNumberZustand";
import ShowNumberZustand from "@/components/zustand/ShowNumber";

export default function Page() {
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1>Wallet connect Solana</h1>
						<ConnectWalletSolana />
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<h1>Wallet connect Ether</h1>
						<ConnectWalletErc20/>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<h1>Zustand Demo</h1>
						<ManipulateNumberZustand/>
						<ShowNumberZustand/>
					</div>
				</div>
			</div>
		</div>
	);
}