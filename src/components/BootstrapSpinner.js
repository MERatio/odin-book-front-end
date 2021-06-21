import PropTypes from 'prop-types';

function BootstrapSpinner({ type, size, classes }) {
	return (
		<div className={classes}>
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

BootstrapSpinner.defaultProps = {
	type: 'border',
	size: '2em',
	classes: '',
};

BootstrapSpinner.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.string.isRequired,
	classes: PropTypes.string.isRequired,
};

export default BootstrapSpinner;
