import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';
import bus from './utils/bus';
import getData from './lib/getData';
import BootstrapSpinner from './components/BootstrapSpinner';
import Alerts from './components/Alerts';
import SignUpModal from './components/SignUpModal';
import SignInView from './views/SignInView';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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

  useEffect(() => {
    async function fetchAndSetCurrentUser() {
      try {
        const data = await getData(
          `${process.env.REACT_APP_API_URL}/users/current-user`
        );
        setCurrentUser(data.currentUser);
      } catch (err) {
        setCurrentUser(false);
        window.alerts([{ msg: err.message }]);
      }
      setIsLoading(false);
    }
    fetchAndSetCurrentUser();
  }, []);

  return isLoading ? (
    <BootstrapSpinner type={'grow'} size={'3em'} />
  ) : (
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
      <main>
        <Switch>
          <Route exact path="/">
            {currentUser ? (
              <Redirect to="/posts" />
            ) : (
              <>
                <SignUpModal setCurrentUser={setCurrentUser} />
                <SignInView
                  setIsLoading={setIsLoading}
                  setCurrentUser={setCurrentUser}
                />
              </>
            )}
          </Route>
          <Route exact path="/posts">
            {currentUser ? (
              <>
                <h1>TODO: timeline</h1>
                {JSON.stringify(currentUser)}
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;