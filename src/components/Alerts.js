import PropTypes from 'prop-types';
import Alert from './Alert';

function Alerts({ alerts, onAlertDelete }) {
	return (
		<>
			{alerts.map((alert) => (
				<Alert key={alert.id} alert={alert} onAlertDelete={onAlertDelete} />
			))}
		</>
	);
}

Alerts.propTypes = {
	alerts: PropTypes.array.isRequired,
	onAlertDelete: PropTypes.func.isRequired,
};

export default Alerts;
