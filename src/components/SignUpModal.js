import PropTypes from 'prop-types';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import SignUpForm from './SignUpForm';

function SignUpModal({ setCurrentUser }) {
	function hideModal(e) {
		const modalId = e.target.dataset.modalId;
		const bsSignUpModal = Modal.getInstance(document.getElementById(modalId));
		bsSignUpModal.hide();
	}

	return (
		<div
			className="modal fade"
			id="signUpModal"
			tabIndex="-1"
			aria-labelledby="signUpModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h3 className="modal-title" id="signUpModalLabel">
							Sign Up
						</h3>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							data-modal-id={'signUpModal'}
							onClick={hideModal}
						></button>
					</div>
					<div className="modal-body">
						<SignUpForm setCurrentUser={setCurrentUser} />
					</div>
				</div>
			</div>
		</div>
	);
}

SignUpModal.propTypes = {
	setCurrentUser: PropTypes.func.isRequired,
};

export default SignUpModal;
