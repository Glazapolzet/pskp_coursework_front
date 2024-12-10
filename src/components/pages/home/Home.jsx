import './Home.css';

import {
  NavLink,
  Outlet,
} from 'react-router';

import { ROUTES } from '../../../shared/routesConfig';

export const Home = () => {
  return (
      <section className="deposits">
        <div className="deposits-tab">
          <NavLink to={ROUTES.depositList} className={({ isActive }) => isActive ? "active" : ""}>
            Список вкладов
          </NavLink>
          <NavLink to={ROUTES.addDeposit} className={({ isActive }) => isActive ? "active" : ""}>
            Добавить вклад
          </NavLink>
        </div>
        <Outlet />
      </section>
  )
}