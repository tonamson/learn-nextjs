'use client';

import {toast} from "react-toastify";
import {FormEvent, useState} from "react";
import {doLogin} from "@/lib/auth";
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation'
import {useAccountStore} from "@/stores/account";

export default function AuthPage() {
	const {setAccount} = useAccountStore()
	const [username, setUsername] = useState('kanni');
	const [password, setPassword] = useState('admin@123');
	const router = useRouter()
	
	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		doLogin(username, password).then((res) => {
			// @ts-ignore
			const {message, data, success} = res
			if (success) {
				Cookies.set('backend_token', data.token)
				toast.success('Login success')
			} else toast.error(message)
			setUsername('')
			setPassword('')
			setAccount({
				...data.payload,
				token: data.token,
			})
			setTimeout(() => {
				router.push('/')
			}, 1000)
		}).catch(e => {
			toast.error(e.response.data.message)
			setUsername('')
			setPassword('')
		})
	}
	
	return (
		<div className="hero-static d-flex align-items-center">
			<div className="content">
				<div className="row justify-content-center push">
					<div className="col-md-8 col-lg-6 col-xl-4">
						<div className="block block-rounded mb-0">
							<div className="block-header block-header-default">
								<h3 className="block-title">Sign In</h3>
							</div>
							<div className="block-content">
								<div className="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
									<h1 className="h2 mb-1">Administrator</h1>
									<p className="fw-medium text-muted">
										Welcome, please login.
									</p>
									
									<form onSubmit={handleLogin} className="js-validation-signin" method="POST">
										<div className="py-3">
											<div className="mb-4">
												<input type="text" className="form-control form-control-alt form-control-lg" name="login-username" placeholder="Username"
													   value={username}
													   onChange={(e) => setUsername(e.target.value)}/>
											</div>
											<div className="mb-4">
												<input type="password" className="form-control form-control-alt form-control-lg" name="login-password" placeholder="Password"
													   value={password}
													   onChange={(e) => setPassword(e.target.value)}/>
											</div>
										</div>
										<div className="row mb-4">
											<div className="col-md-6 col-xl-5">
												<button type="submit" className="btn w-100 btn-alt-primary">
													<i className="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i> Sign In
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}