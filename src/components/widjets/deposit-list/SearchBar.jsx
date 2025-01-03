import './SearchBar.css';

import PropTypes from 'prop-types';

export const SearchBar = ({ searchTerm, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск по названию или банку"
        value={searchTerm}
        onChange={onChange}
      />
    </div>
  )
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  onChange: PropTypes.func,
}
