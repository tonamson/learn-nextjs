export default function Intro() {
	return (
		<section className="position-relative z-2 block-home-main" id="home">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 custom-mb wow zoomIn" data-wow-duration="2s" data-wow-delay="0s">
						<div className="block-content position-relative">
							<div className="banner-right position-absolute">
								<a href="#">
									<img className="aniamtion-key-1" src="/images/banner-lg.png" alt=""/>
								</a>
							</div>
							<div className="content-left">
								<div className="logo-text">
									<img src="/images/logo-text.svg" alt=""/>
								</div>
								<div className="desc">Rabbit Token is not only a cute coin, but also a symbol of change and financial freedom. Join the Rabbit Token community and be a part of this adventure today!</div>
								<div className="item-form-copy position-relative">
									<input className="form-control" type="text" value={process.env.NEXT_PUBLIC_RABBIT_TOKEN_ADDRESS} readOnly={true}/>
									<button className="btn btn-copy position-absolute">
										<img src="/images/copy.svg" alt=""/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}