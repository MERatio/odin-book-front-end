import PropTypes from 'prop-types';
import '../css/BootstrapSpinner.css';

function BootstrapSpinner({ type, size }) {
	return (
		<div className="BootstrapSpinner">
			<div
				className={`spinner-${type} text-primary`}
				style={{ width: size, height: size }}
				role="status"
			>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}

BootstrapSpinner.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
};

export default BootstrapSpinner;
