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
          alt="banner" 
          className="home-banner"
        />
        <div className="home-message">
          <h1>Здесь вы найдете большой ассортимент косметики</h1>
        </div>
      </div>
      <section className="cosmetics">
        <div className="cosmetics-tab">
          <NavLink to={ROUTES.depositList} className={({ isActive }) => isActive ? "active" : ""}>
            Перечень косметики
          </NavLink>
          <NavLink to={ROUTES.addDeposit} className={({ isActive }) => isActive ? "active" : ""}>
            Добавить косметику
          </NavLink>
        </div>
        <Outlet />
      </section>
    </>
  )
}