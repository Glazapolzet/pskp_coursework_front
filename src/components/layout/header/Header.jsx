import './Header.css';

import PropTypes from 'prop-types';

import reactImg from '../../../assets/logo.jpg';

export const Header = ({ logoutButton: LogoutButton }) => {
  return (
    <header className="header">
      <div className="header-tab">
        <img src={reactImg} className="header-logo" />
        <div className="header-title-container">
          <h1 className="header-title">💅 Магазин косметики 💅</h1>
        </div>
        {LogoutButton}
      </div>
    </header>
  )
}

Header.propTypes = {
  logoutButton: PropTypes.element,
}
