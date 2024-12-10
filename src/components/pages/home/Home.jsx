import './Home.css';

import {
  NavLink,
  Outlet,
} from 'react-router';

import { ROUTES } from '../../../shared/routesConfig';

export const Home = () => {
  return (
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
  )
}