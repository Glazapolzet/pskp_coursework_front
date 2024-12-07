import { Outlet } from "react-router";
import money from "../../assets/money.jpg";
import "./Main.css";

export const Main = () => {
  return (
    <main className="main">
      <div className="main-panel">
        <img 
          src={money}
          alt="Bank banner" 
          className="main-banner"
        />
        <div className="main-message">
          <h1>Добро пожаловать в наш банк!</h1>
          <p>Здесь вы можете сделать вклад под любой процент</p>
        </div>
      </div>
      <Outlet />
    </main>
  );
};
