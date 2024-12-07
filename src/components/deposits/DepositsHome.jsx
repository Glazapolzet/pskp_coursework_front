import { NavLink, Outlet } from "react-router";
import { ROUTES } from "../../shared/routesConfig";
import "./DepositsHome.css";

export const DepositsHome = () => {
  return (
    <>
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