'use client';

import Link from 'next/link'
import {useAccountStore} from "@/stores/account";
import {useRouter} from "next/navigation";

export default function Header() {
	const {account, resetAccount} = useAccountStore()
	const router = useRouter()
	
	const doLogout = () => {
		resetAccount()
		router.push('/login')
	}
	
	return (
		<header id="page-header">
			<div className="content-header">
				<div className="d-flex align-items-center">
					<button type="button" className="btn btn-sm btn-alt-secondary me-2 d-lg-none" data-toggle="layout" data-action="sidebar_toggle">
						<i className="fa fa-fw fa-bars"></i>
					</button>
					<button type="button" className="btn btn-sm btn-alt-secondary d-md-none" data-toggle="layout" data-action="header_search_on">
						<i className="fa fa-fw fa-search"></i>
					</button>
				</div>
				
				<div className="d-flex align-items-center">
					<div className="dropdown d-inline-block ms-2">
						<button type="button" className="btn btn-sm btn-alt-secondary d-flex align-items-center" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<img className="rounded-circle" src="/assets/media/avatars/avatar10.jpg" alt="Header Avatar" style={{
								width: '21px',
							}}/>
							<span className="d-none d-sm-inline-block ms-2">{account.username}</span>
							<i className="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"></i>
						</button>
						<div className="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0" aria-labelledby="page-header-user-dropdown">
							<div className="p-3 text-center bg-body-light border-bottom rounded-top">
								<img className="img-avatar img-avatar48 img-avatar-thumb" src="/assets/media/avatars/avatar10.jpg" alt=""/>
								<p className="mt-2 mb-0 fw-medium">{account.username}</p>
							</div>
							<div role="separator" className="dropdown-divider m-0"></div>
							<div className="p-2">
								<a className="dropdown-item d-flex align-items-center justify-content-between" onClick={doLogout}>
									<span className="fs-sm fw-medium">Log Out</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}