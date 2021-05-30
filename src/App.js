import './App.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import bus from './utils/bus';
import Alerts from './components/Alerts';

function App() {
  const [alerts, setAlerts] = useState([]);

  function handleAlertDelete(alertId) {
    const newAlerts = alerts.filter((alert) => alert.id !== alertId);
    setAlerts(newAlerts);
  }

  // Listen for 'alerts' event and sets the alerts.
  useEffect(() => {
    bus.addListener('alerts', (alerts) => {
      const alertsWithId = alerts.map((alert) => ({
        ...alert,
        id: nanoid(),
      }));
      setAlerts((prevAlerts) => prevAlerts.concat(alertsWithId));
    });
  }, []);

  // Add a global function that emit an alerts event.
  useEffect(() => {
    window.alerts = (alerts) => bus.emit('alerts', alerts);
  }, []);

  return (
    <>
      {alerts.length > 0 && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Alerts alerts={alerts} onAlertDelete={handleAlertDelete} />
            </div>
          </div>
        </div>
      )}
      <div>
        <h1>Odin Book</h1>
      </div>
    </>
  );
}

export default App;
