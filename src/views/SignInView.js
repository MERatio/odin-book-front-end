import PropTypes from 'prop-types';
import SignInForm from '../components/SignInForm';
import '../css/SignIn.css';

function SignIn({ setIsLoading, setCurrentUser }) {
	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-sm-10 col-md-8 col-lg-6">
					<h1 className="sign-in-h1 text-primary text-center fw-bold mb-4">
						Odin Book
					</h1>
					<section>
						<SignInForm
							setIsLoading={setIsLoading}
							setCurrentUser={setCurrentUser}
						/>
					</section>
				</div>
			</div>
		</div>
	);
}

SignIn.propTypes = {
	setIsLoading: PropTypes.func.isRequired,
	setCurrentUser: PropTypes.func.isRequired,
};

export default SignIn;
