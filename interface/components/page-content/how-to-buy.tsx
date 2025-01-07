export default function HowToBuy() {
	return (
		<section className="position-relative block-buy-main" id="how-to-buy">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="content-main">
							<div className="title-section text-center">
								<h3 className="custom text-uppercase">how to buy token?</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 col-sm-6">
						<div className="item-buy-banner position-relative wow fadeInLeft" data-wow-duration="2s" data-wow-delay="1.5s">
							<div className="banner position-absolute"><img src="/images/banner-connect-your-wallet.png" alt=""/></div>
							<div className="content">
								<div className="title position-relative text-center"><span>Prepare your wallet</span></div>
								<div className="desc">
									<div className="text">Create a cryptocurrency wallet: If you don’t already have one, create a cryptocurrency wallet that supports the tokens you want to buy. Some popular wallets include MetaMask, Trust Wallet, or Coinbase Wallet.
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="item-buy-banner position-relative wow fadeInLeft" data-wow-duration="2s" data-wow-delay="1s">
							<div className="banner position-absolute"><img src="/images/banner-exchange-some-sol.png" alt=""/></div>
							<div className="content">
								<div className="title position-relative text-center"><span>Prepare your assets</span></div>
								<div className="desc">
									<div className="text">Deposit assets: Make sure you have enough assets in your wallet to make the transaction. You can buy these assets from centralized exchanges (CEX) like Binance, Coinbase, etc.</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4 col-sm-6">
						<div className="item-buy-banner position-relative wow fadeInLeft" data-wow-duration="2s" data-wow-delay="0.5s">
							<div className="banner position-absolute"><img src="/images/banner-start-buying-selling.png" alt=""/></div>
							<div className="content">
								<div className="title position-relative text-center"><span>Connect and start</span></div>
								<div className="desc">
									<div className="text">Connect your wallet to the DEX: Select the DEX you want and connect your wallet to the platform.<br/>
										Make a trade: Follow the instructions on the page to participate. You will need to enter the amount of tokens you want to buy and confirm the transaction. Make sure to double check all the information before confirming.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}