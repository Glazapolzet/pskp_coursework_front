import { NavLink, Outlet } from "react-router";
import money from "../../../assets/money.jpg";
import { ROUTES } from "../../../shared/routesConfig";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <div className="home-panel">
        <img 
          src={money}
          alt="Bank banner" 
          className="home-banner"
        />
        <div className="home-message">
          <h1>Добро пожаловать в наш банк!</h1>
          <p>Здесь вы можете сделать вклад под любой процент</p>
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