import Link from 'next/link'

export default function SideBar(){
	return (
		<nav id="sidebar" aria-label="Main Navigation">
			<div className="content-header">
				<Link className="fw-semibold text-dual" href="/">
					<span className="smini-visible">
					  <i className="fa fa-circle-notch text-primary"></i>
					</span>
					<span className="smini-hide fs-5 tracking-wider">AdminPanel</span>
				</Link>
			</div>
			
			<div className="js-sidebar-scroll">
				<div className="content-side">
					<ul className="nav-main">
						<li className="nav-main-item">
							<Link href="/" className="nav-main-link">
								<i className="nav-main-link-icon si si-speedometer"></i>
								<span className="nav-main-link-name">Dashboard</span>
							</Link>
						</li>
						<li className="nav-main-item">
							<a className="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
								<i className="nav-main-link-icon si si-layers"></i>
								<span className="nav-main-link-name">Page Packs</span>
							</a>
							<ul className="nav-main-submenu">
								<li className="nav-main-item">
									<a className="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
										<i className="nav-main-link-icon si si-bag"></i>
										<span className="nav-main-link-name">e-Commerce</span>
									</a>
									<ul className="nav-main-submenu">
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_dashboard.html">
												<span className="nav-main-link-name">Dashboard</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_orders.html">
												<span className="nav-main-link-name">Orders</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_order.html">
												<span className="nav-main-link-name">Order</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_products.html">
												<span className="nav-main-link-name">Products</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_product_edit.html">
												<span className="nav-main-link-name">Product Edit</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_customer.html">
												<span className="nav-main-link-name">Customer</span>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-main-item">
									<a className="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
										<i className="nav-main-link-icon si si-handbag"></i>
										<span className="nav-main-link-name">e-Commerce Store</span>
									</a>
									<ul className="nav-main-submenu">
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_store_home.html">
												<span className="nav-main-link-name">Home</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_store_search.html">
												<span className="nav-main-link-name">Search Results</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_store_products.html">
												<span className="nav-main-link-name">Products List</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_store_product.html">
												<span className="nav-main-link-name">Product Page</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_ecom_store_checkout.html">
												<span className="nav-main-link-name">Checkout</span>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-main-item">
									<a className="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
										<i className="nav-main-link-icon si si-pencil"></i>
										<span className="nav-main-link-name">Blog</span>
									</a>
									<ul className="nav-main-submenu">
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_blog_classic.html">
												<span className="nav-main-link-name">Classic</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_blog_list.html">
												<span className="nav-main-link-name">List</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_blog_grid.html">
												<span className="nav-main-link-name">Grid</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_blog_story.html">
												<span className="nav-main-link-name">Story</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_blog_story_cover.html">
												<span className="nav-main-link-name">Story Cover</span>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-main-item">
									<a className="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
										<i className="nav-main-link-icon si si-graduation"></i>
										<span className="nav-main-link-name">e-Learning</span>
									</a>
									<ul className="nav-main-submenu">
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_elearning_courses.html">
												<span className="nav-main-link-name">Courses</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_elearning_course.html">
												<span className="nav-main-link-name">Course</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_elearning_lesson.html">
												<span className="nav-main-link-name">Lesson</span>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-main-item">
									<a className="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
										<i className="nav-main-link-icon si si-bubbles"></i>
										<span className="nav-main-link-name">Forum</span>
									</a>
									<ul className="nav-main-submenu">
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_forum_categories.html">
												<span className="nav-main-link-name">Categories</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_forum_topics.html">
												<span className="nav-main-link-name">Topics</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="be_pages_forum_discussion.html">
												<span className="nav-main-link-name">Discussion</span>
											</a>
										</li>
									</ul>
								</li>
								<li className="nav-main-item">
									<a className="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
										<i className="nav-main-link-icon si si-magnet"></i>
										<span className="nav-main-link-name">Boxed Backend</span>
									</a>
									<ul className="nav-main-submenu">
										<li className="nav-main-item">
											<a className="nav-main-link" href="bd_dashboard.html">
												<span className="nav-main-link-name">Dashboard</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="bd_search.html">
												<span className="nav-main-link-name">Search</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="bd_simple_1.html">
												<span className="nav-main-link-name">Simple 1</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="bd_simple_2.html">
												<span className="nav-main-link-name">Simple 2</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="bd_image_1.html">
												<span className="nav-main-link-name">Image 1</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="bd_image_2.html">
												<span className="nav-main-link-name">Image 2</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="bd_video_1.html">
												<span className="nav-main-link-name">Video 1</span>
											</a>
										</li>
										<li className="nav-main-item">
											<a className="nav-main-link" href="bd_video_2.html">
												<span className="nav-main-link-name">Video 2</span>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}