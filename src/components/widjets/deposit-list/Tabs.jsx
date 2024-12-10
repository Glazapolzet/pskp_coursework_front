import './Tabs.css';

import PropTypes from 'prop-types';

export const Tabs = ({ tabItems, activeTab, setTab }) => {
  return (
    <div className="tabs">
        <button
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setTab("all")}
        >
          Все
        </button>
        {tabItems.map((item) => (
          <button
            key={item.key}
            className={`tab ${
              activeTab === item.key ? "active" : ""
            }`}
            onClick={() => setTab(item.key)}
          >
            {item.name}
          </button>
        ))}
      </div>
  )
}

Tabs.propTypes = {
  tabItems: PropTypes.array,
  activeTab: PropTypes.string,
  setTab: PropTypes.func,
}
