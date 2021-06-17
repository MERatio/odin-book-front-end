import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import getUserPicture from '../lib/getUserPicture';

function UsersShowNavbarLink({ currentUser }) {
  return (
    <Route
      path="/users/userId"
      children={({ match }) => (
        <NavLink
          className={`nav-link ${match ? 'active' : ''}`}
          {...(match && { 'aria-current': 'page' })}
          exact
          to={`/users/${currentUser._id}`}
        >
          <img
            className="rounded-circle me-2"
            src={getUserPicture(currentUser)}
            alt="Current user"
            width="28"
            height="28"
          />
          <span>{currentUser.firstName}</span>
        </NavLink>
      )}
    />
  );
}

UsersShowNavbarLink.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default UsersShowNavbarLink;
