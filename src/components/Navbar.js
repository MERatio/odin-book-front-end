import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import UsersShowNavbarLink from './UsersShowNavbarLink';

function Navbar({ currentUser, signOut }) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/posts">
          Odin Book
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            <li className="nav-item me-4">
              <UsersShowNavbarLink currentUser={currentUser} />
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={signOut}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navbar;
