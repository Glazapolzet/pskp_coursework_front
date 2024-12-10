import './Home.css';

import {
  NavLink,
  Outlet,
} from 'react-router';

import cosmeticItems from '../../../assets/cosmeticitems.jpeg';
import { ROUTES } from '../../../shared/routesConfig';

export const Home = () => {
  return (
    <>
      <div className="home-panel">
        <img 
          src={cosmeticItems}
          alt="Bank banner" 
          className="home-banner"
        />
        <div className="home-message">
          <h1>Первым покупателям положена скидка 30%</h1>
        </div>
      </div>
      <section className="deposits">
        <div className="deposits-tab">
          <NavLink to={ROUTES.depositList} className={({ isActive }) => isActive ? "active" : ""}>
            Перечень вкладов
          </NavLink>
          <NavLink to={ROUTES.addDeposit} className={({ isActive }) => isActive ? "active" : ""}>
            Создать вклад
          </NavLink>
        </div>
        <Outlet />
      </section>
    </>
  )
}