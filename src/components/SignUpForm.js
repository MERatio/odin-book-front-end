import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import useIsMounted from '../hooks/useIsMounted';
import postData from '../lib/postData';
import SubmitBtn from './SubmitBtn';

function SignUpForm({ setCurrentUser }) {
	const isMounted = useIsMounted();

	const [state, setState] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleInputChange(e) {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setState((prevState) => ({ ...prevState, [name]: value }));
	}

	function handleInputFocus(e) {
		const input = e.target;
		const formGroup = input.parentNode;
		const invalidFeedbackDivs = formGroup.querySelectorAll('.invalid-feedback');
		if (invalidFeedbackDivs.length === 0) {
			return;
		}
		input.classList.remove('is-invalid');
		for (const invalidFeedbackDiv of invalidFeedbackDivs) {
			invalidFeedbackDiv.remove();
		}
	}

	function removeFormErrors() {
		const signUpForm = document.getElementById('signUpForm');
		if (signUpForm) {
			const invalidFeedbackDivs = signUpForm.querySelectorAll(
				'.invalid-feedback'
			);
			if (invalidFeedbackDivs.length === 0) {
				return;
			}
			const inputs = signUpForm.querySelectorAll('input');
			for (const input of inputs) {
				input.classList.remove('is-invalid');
			}
			for (const invalidFeedbackDiv of invalidFeedbackDivs) {
				invalidFeedbackDiv.remove();
			}
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		removeFormErrors();
		setIsSubmitting(true);
		function addFormErrors(errors) {
			const signUpForm = document.getElementById('signUpForm');
			for (const error of errors) {
				const input = signUpForm.querySelector(`input[name='${error.param}']`);
				const formGroup = input.parentNode;
				input.classList.add('is-invalid');
				const invalidFeedbackDiv = document.createElement('div');
				invalidFeedbackDiv.classList.add('invalid-feedback');
				const invalidFeedbackDivText = document.createTextNode(error.msg);
				invalidFeedbackDiv.appendChild(invalidFeedbackDivText);
				formGroup.insertAdjacentElement('beforeend', invalidFeedbackDiv);
			}
		}

		try {
			const data = await postData(
				`${process.env.REACT_APP_API_URL}/users`,
				state
			);
			setIsSubmitting(false);
			if (data.err) {
				window.alerts([{ msg: data.err.message }]);
			} else if (data.errors) {
				const isEmailErrorIncluded = data.errors.some((error) => {
					return error.param === 'email';
				});
				isMounted &&
					setState({
						firstName: data.user.firstName,
						lastName: data.user.lastName,
						/* Validator package normalizeEmail() adds a '@' at the front
						   if email is not valid.
						*/
						email: isEmailErrorIncluded ? '' : data.user.email,
						password: '',
						passwordConfirmation: '',
					});
				addFormErrors(data.errors);
			} else {
				const bsSignUpModal = Modal.getInstance(
					document.getElementById('signUpModal')
				);
				bsSignUpModal.hide();
				localStorage.setItem('jwt', data.jwt);
				setCurrentUser(data.user);
				window.alerts([
					{ msg: 'You have successfuly signed up', type: 'success' },
				]);
			}
		} catch (err) {
			setIsSubmitting(false);
			window.alerts([{ msg: err.message }]);
		}
	}

	useEffect(() => {
		const signUpModal = document.getElementById('signUpModal');
		// Reset state when sign up modal gets hidden.
		signUpModal.addEventListener('hidden.bs.modal', (e) => {
			removeFormErrors();
			setState({
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				passwordConfirmation: '',
			});
		});
	}, []);

	return (
		<form onSubmit={handleSubmit} id="signUpForm">
			<div className="mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="First name"
					aria-label="First name"
					name="firstName"
					value={state.firstName}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
				/>
			</div>
			<div className="mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Last name"
					aria-label="Last name"
					name="lastName"
					value={state.lastName}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
				/>
			</div>
			<div className="mb-3">
				<input
					type="text"
					className="form-control"
					placeholder="Email"
					aria-label="Email"
					name="email"
					value={state.email}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
				/>
			</div>
			<div className="mb-3">
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					aria-label="Password"
					name="password"
					value={state.password}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
				/>
			</div>
			<div className="mb-3">
				<input
					type="password"
					className="form-control"
					placeholder="Password confirmation"
					aria-label="Password confirmation"
					name="passwordConfirmation"
					value={state.passwordConfirmation}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
				/>
			</div>
			<SubmitBtn
				className="btn btn-success btn-lg w-100 rounded-3"
				text="Sign Up"
				loadingText="Signing Up..."
				isSubmitting={isSubmitting}
			/>
		</form>
	);
}

SignUpForm.propTypes = {
	setCurrentUser: PropTypes.func.isRequired,
};

export default SignUpForm;
