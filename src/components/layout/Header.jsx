import { useContext } from "react";
import { useNavigate } from "react-router";
import tokenHelper, { apiAuth } from "../../api";
import reactImg from '../../assets/avatarka-s-bukvoi-b-1.png';
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../shared/routesConfig";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    await apiAuth.logout();

    tokenHelper.clearLocalTokens();
    setIsLoggedIn(false);

    navigate(ROUTES.login);
  }

  return (
    <header className="header">
      <div className="header-tab">
        <img src={reactImg} className="header-logo" />
        <div className="header-title-container">
          <h1 className="header-title">Приложение банка</h1>
          <p className="header-subtitle">Самые выгодные вклады!</p>
        </div>
        <button onClick={logout} className="header-quit-button">Выход</button>
      </div>
    </header>
  )
}
