import './Header.css';

import PropTypes from 'prop-types';

export const Header = ({ logoutButton: LogoutButton }) => {
  return (
    <header className="header">
      <div className="header-tab">
        {LogoutButton}
      </div>
    </header>
  )
}

Header.propTypes = {
  logoutButton: PropTypes.element,
}
