export default function BuyIt() {
	return (
		<section className="position-relative block-token-main">
			<div className="container">
				<div className="row">
					<div className="col-md-7">
						<div className="content-main position-relative wow fadeIn" data-wow-duration="2s" data-wow-delay="1s">
							<div className="scroll-h">
								<div className="title-section text-center">
									<h3 className="custom text-uppercase">BUY TOKEN NOW</h3>
								</div>
								<div className="desc mb-5">
									<div className="mb-4">To successfully launch our token on the Solana network, we will take a strategic approach to ensure visibility and liquidity. Initially, upon reaching a market cap of 1 million, we will apply for listing on Coin Gecko and Coin Market Cap to
										enhance the credibility of the project and attract potential investors. We will then actively seek listing on multiple centralized exchanges (CEX) to expand our reach and attract a wider investor base. Once our market cap grows and reaches 10 million, we will
										aim to apply for listing on major exchanges such as Binance and Coinbase, which will further solidify our market position and drive continued growth for our token.
									</div>
								</div>
								<div className="listing">
									<div className="title-lg text-center">
										<h3 className="fw-bold time-listing">TIME LISTING</h3>
									</div>
									<div className="item-time text-center">
										<div className="row marg-box-10">
											<div className="col-3 padd-10">
												<div className="item-sm">
													<div className="time" id="day-cms">399</div>
													<div className="text">DAYS</div>
												</div>
											</div>
											<div className="col-3 padd-10">
												<div className="item-sm">
													<div className="time" id="hour-cms">399</div>
													<div className="text">HOURS</div>
												</div>
											</div>
											<div className="col-3 padd-10">
												<div className="item-sm">
													<div className="time" id="min-cms">399</div>
													<div className="text">MINUTES</div>
												</div>
											</div>
											<div className="col-3 padd-10">
												<div className="item-sm">
													<div className="time" id="sec-cms">399</div>
													<div className="text">SECONDS</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							
							
							</div>
							<div className="banner-left position-absolute"><a href=""><img className="aniamtion-key-1" src="client/images/banner-buy.png" alt=""/></a></div>
						</div>
					</div>
					<div className="col-md-5">
						<div className="block-token-sale wow flipInY" data-wow-duration="2s" data-wow-delay="1.5s">
							<div className="title-lg text-center">
								<h3>TOKEN SALE ENDS IN</h3>
							</div>
							<div className="item-time text-center">
								<div className="row marg-box-10">
									<div className="col-3 padd-10">
										<div className="item-sm">
											<div className="time" id="day-cms">399</div>
											<div className="text">DAYS</div>
										</div>
									</div>
									<div className="col-3 padd-10">
										<div className="item-sm">
											<div className="time" id="hour-cms">399</div>
											<div className="text">HOURS</div>
										</div>
									</div>
									<div className="col-3 padd-10">
										<div className="item-sm">
											<div className="time" id="min-cms">399</div>
											<div className="text">MINUTES</div>
										</div>
									</div>
									<div className="col-3 padd-10">
										<div className="item-sm">
											<div className="time" id="sec-cms">399</div>
											<div className="text">SECONDS</div>
										</div>
									</div>
								</div>
							</div>
							<div className="item-progress position-relative">
								<div className="desc-value position-relative">
									<div className="text-min position-absolute">33m</div>
									<div className="text-max">75m</div>
								</div>
								<div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
									<div className="progress-bar" style={{'width': '65%'}}></div>
								</div>
								<div className="desc-text d-flex justify-content-between">
									<div className="text-min">Softcap in 103 days</div>
									<div className="text-max">Token Hardcap</div>
								</div>
							</div>
							<div className="justify-content-between d-flex item-pre-sale">
								<div className="text">PRE-SALE</div>
								<div className="content d-flex align-items-center">
									<div className="value">1</div>
									<div className="icon"><img src="/images/c4.svg" alt=""/></div>
									<div className="text-midd">=</div>
									<div className="text">1.000</div>
									<div className="icon"><img src="/images/logo-sm.svg" alt=""/></div>
								</div>
							</div>
							<div className="item-buy-rabbit">
								<div className="title text-center">BUY RABBIT TOKEN</div>
								<div className="form-buy position-relative">
									<input className="form-control" type="text" placeholder="0"/>
									<button className="btn btn-max position-absolute">MAX</button>
								</div>
							</div>
							<div className="align-items-end d-flex item-text-receive justify-content-center">
								<div className="text">You will receive:</div>
								<div className="value">00</div>
								<div className="icon"><img src="/images/logo-sm.svg" alt=""/></div>
							</div>
							<div className="link-bottom">
								<button className="btn btn-blue-gradient lg w-100">BUY</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}