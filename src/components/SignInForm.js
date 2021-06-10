import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import useIsMounted from '../hooks/useIsMounted';
import postData from '../lib/postData';
import SubmitBtn from './SubmitBtn';

/* Facebook SDK is blocked 
		 by blockers (Firefox Tracking Protection, uBlock Origin, etc...).
	 Even if window.FB is set, some resource inside Facebook SDK is blocked too. 
	 Therefore crashing the app (can't try catch).
*/

// Facebook SDK call this function automatically (with delay).
window.fbAsyncInit = function () {
	window.FB.init({
		appId: `${process.env.REACT_APP_FACEBOOK_APP_ID}`,
		cookie: true,
		xfbml: true,
		version: 'v10.0',
	});

	window.FB.AppEvents.logPageView();
};

// Insert Facebook SDK.
(function (d, s, id) {
	var js,
		fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = 'https://connect.facebook.net/en_US/sdk.js';
	fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

function SignInForm({ setIsLoading, setCurrentUser }) {
	const isMounted = useIsMounted();

	const [state, setState] = useState({
		email: '',
		password: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFacebookSdkLoaded, setIsFacebookSdkLoaded] = useState(undefined);
	const [isFacebookPopupOpen, setIsFacebookLPopupOpen] = useState(false);
	const [facebookResponse, setFacebookResponse] = useState({});

	function handleInputChange(e) {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setState((prevState) => ({ ...prevState, [name]: value }));
	}

	async function handleSubmit(e) {
		try {
			e.preventDefault();
			setIsSubmitting(true);
			const data = await postData(
				`${process.env.REACT_APP_API_URL}/auth/local`,
				state
			);
			setIsSubmitting(false);
			if (data.err) {
				isMounted && setState((prevState) => ({ ...prevState, password: '' }));
				window.alerts([{ msg: data.err.message }]);
			} else {
				localStorage.setItem('jwt', data.jwt);
				setCurrentUser(data.currentUser);
				window.alerts([
					{ msg: 'You have successfuly signed in', type: 'success' },
				]);
			}
		} catch (err) {
			setIsSubmitting(false);
			window.alerts([{ msg: err.message }]);
		}
	}

	function handleFacebookBtnClick() {
		if (!isFacebookSdkLoaded || isFacebookPopupOpen) {
			return;
		}

		async function sendAccessTokenToApi(response) {
			setIsLoading(true);
			try {
				const postResponse = await postData(
					`${process.env.REACT_APP_API_URL}/auth/facebook`,
					{ userAccessToken: response.authResponse.accessToken },
					true
				);
				const data = await postResponse.json();
				if (data.err) {
					window.alerts([{ msg: data.err.message }]);
				} else {
					localStorage.setItem('jwt', data.jwt);
					setCurrentUser(data.currentUser);
					window.alerts([
						{
							msg: `You have successfuly ${
								postResponse.status === 200 ? 'signed in' : 'signed up'
							}`,
							type: 'success',
						},
					]);
				}
			} catch (err) {
				window.alerts([{ msg: err.message }]);
			}
			setIsLoading(false);
		}

		function handleFacebookPopupResponse(response) {
			if (response.status === 'connected') {
				if (
					isDataAccessExpired(response) ||
					!isScopesGranted(response, 'public_profile,email')
				) {
					window.alerts([
						{
							msg: 'Facebook email is required. Please select the Facebook button again.',
							type: 'info',
						},
					]);
				} else {
					sendAccessTokenToApi(response);
				}
			}
		}

		function isDataAccessExpired(response) {
			if (!response || !response.data_access_expiration_time) {
				return false;
			} else {
				const dataAccessExpirationInMilliseconds =
					response.authResponse.data_access_expiration_time * 1000;
				return dataAccessExpirationInMilliseconds <= Date.now();
			}
		}

		function isScopesGranted(response, scopes) {
			if (
				!response ||
				!response.authResponse ||
				!response.authResponse.grantedScopes
			) {
				return false;
			} else {
				const grantedScopes = response.authResponse.grantedScopes.split(',');
				const scopesArr = scopes.split(',');
				for (const scope of scopesArr) {
					if (!grantedScopes.includes(scope)) {
						return false;
					}
				}
				return true;
			}
		}

		function missingGrantedScopes(response, scopes) {
			if (
				!response ||
				!response.authResponse ||
				!response.authResponse.grantedScopes
			) {
				return scopes;
			} else {
				const grantedScopes = response.authResponse.grantedScopes.split(',');
				const scopesArr = scopes.split(',');
				let notGrantedScopes = '';
				for (const scope of scopesArr) {
					if (!grantedScopes.includes(scope)) {
						if (notGrantedScopes.length > 0) {
							notGrantedScopes += ',';
						}
						notGrantedScopes += scope;
					}
				}
				return notGrantedScopes;
			}
		}

		function openFacebookPopup(response) {
			setIsFacebookLPopupOpen(true);
			window.FB.login(
				(response) => {
					setIsFacebookLPopupOpen(false);
					setFacebookResponse(response);
					handleFacebookPopupResponse(response);
				},
				{
					scope: missingGrantedScopes(response, 'public_profile,email'),
					...(response.status === 'connected'
						? isDataAccessExpired(response)
							? { auth_type: 'reauthorize' }
							: !isScopesGranted(response, 'public_profile,email')
							? { auth_type: 'rerequest' }
							: {}
						: {}),
					return_scopes: true,
				}
			);
		}

		function statusChangeCallback(response) {
			if (response.status !== 'connected') {
				openFacebookPopup(response);
			} else {
				if (
					isDataAccessExpired(response) ||
					!isScopesGranted(response, 'public_profile,email')
				) {
					openFacebookPopup(response);
				} else {
					sendAccessTokenToApi(response);
				}
			}
		}

		statusChangeCallback(facebookResponse);
	}

	function showModal(e) {
		const modalId = e.target.dataset.modalId;
		const bsSignUpModal = new Modal(document.getElementById(modalId));
		bsSignUpModal.show();
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (window.FB) {
				setIsFacebookSdkLoaded(true);
				/* Firefox blocks Facebook popup if this is the
						 first function to be called inside handleFacebookBtnClick()
				*/
				window.FB.getLoginStatus((response) => {
					setFacebookResponse(response);
				});
			} else {
				setIsFacebookSdkLoaded(false);
				window.alerts([
					{
						msg: 'Facebook button is disabled because the Facebook SDK is blocked.',
						type: 'info',
					},
				]);
			}
		}, 1500);
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<form onSubmit={handleSubmit} className="p-4 bg-white rounded-3 shadow">
			<div className="mb-3">
				<input
					type="text"
					className="form-control form-control-lg"
					placeholder="Email"
					aria-label="Email"
					disabled={isFacebookPopupOpen}
					name="email"
					value={state.email}
					onChange={handleInputChange}
				/>
			</div>
			<div className="mb-3">
				<input
					type="password"
					className="form-control form-control-lg"
					placeholder="Password"
					aria-label="Password"
					disabled={isFacebookPopupOpen}
					name="password"
					value={state.password}
					onChange={handleInputChange}
				/>
			</div>
			<SubmitBtn
				className="btn btn-primary btn-lg w-100 rounded-3 mb-2"
				text="Sign In"
				loadingText="Signing In..."
				disabled={isFacebookPopupOpen}
				isSubmitting={isSubmitting}
			/>
			<button
				type="button"
				className="btn btn-primary btn-lg w-100 rounded-3"
				disabled={!isFacebookSdkLoaded || isFacebookPopupOpen}
				onClick={handleFacebookBtnClick}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					fill="#fff"
					className="bi bi-facebook"
					viewBox="0 0 16 16"
					role="img"
					aria-label="Facebook icon"
				>
					<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
				</svg>
				<span className="fw-bold ms-2">Continue with Facebook</span>
			</button>
			<div className="border-bottom my-4"></div>
			<button
				type="button"
				className="btn btn-success btn-lg w-100 rounded-3"
				data-modal-id="signUpModal"
				disabled={isFacebookPopupOpen}
				onClick={showModal}
			>
				<span className="fw-bold pe-none">Create New Account</span>
			</button>
		</form>
	);
}

SignInForm.propTypes = {
	setIsLoading: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired,
};

export default SignInForm;
