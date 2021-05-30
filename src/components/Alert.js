import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Alert({ alert, onAlertDelete }) {
	function determineAlertIcon(type) {
		const size = 24;
		switch (type) {
			case 'success':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={size}
						height={size}
						fill="currentColor"
						className="bi bi-check-circle-fill flex-shrink-0 me-2"
						viewBox="0 0 16 16"
						role="img"
						aria-label="Success:"
					>
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
					</svg>
				);
			case 'info':
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={size}
						height={size}
						fill="currentColor"
						className="bi bi-info-circle-fill flex-shrink-0 me-2"
						viewBox="0 0 16 16"
						role="img"
						aria-label="Info:"
					>
						<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
					</svg>
				);
			case 'warning':
			case 'danger':
			default:
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={size}
						height={size}
						fill="currentColor"
						className="bi bi-exclamation-circle-fill flex-shrink-0 me-2"
						viewBox="0 0 16 16"
						role="img"
						aria-label={type === 'warning' ? 'Warning:' : 'Danger:'}
					>
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
					</svg>
				);
		}
	}
	function handleAlertDelete() {
		onAlertDelete(alert.id);
	}

	// Delete alert after 4 sec.
	// Timeout will reset if an alert is deleted, because of rerender.
	useEffect(() => {
		const timeoutId = setTimeout(() => onAlertDelete(alert.id), 4000);
		return () => clearTimeout(timeoutId);
	}, [alert, onAlertDelete]);

	return (
		<div
			className={`alert alert-${
				alert.type || 'danger'
			} d-flex align-items-center alert-dismissible`}
			role="alert"
			data-id={alert.id}
		>
			{determineAlertIcon(alert.type)}
			<div>{alert.msg}</div>
			<button
				type="button"
				className="btn-close"
				aria-label="Close"
				onClick={handleAlertDelete}
			></button>
		</div>
	);
}

Alert.propTypes = {
	alert: PropTypes.object.isRequired,
	onAlertDelete: PropTypes.func.isRequired,
};

export default Alert;
