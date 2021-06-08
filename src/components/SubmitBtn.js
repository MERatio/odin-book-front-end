import PropTypes from 'prop-types';

function SubmitBtn({ className, text, loadingText, disabled, isSubmitting }) {
	return (
		<button
			type="submit"
			className={className}
			disabled={disabled || isSubmitting}
		>
			{isSubmitting ? (
				<>
					<span
						className="spinner-border spinner-border-sm fw-bold"
						role="status"
						aria-hidden="true"
					></span>
					{loadingText}
				</>
			) : (
				<span className="fw-bold">{text}</span>
			)}
		</button>
	);
}

SubmitBtn.defaultProps = {
	className: '',
	text: 'Submit',
	disabled: false,
};

SubmitBtn.propTypes = {
	className: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	loadingText: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
};

export default SubmitBtn;
