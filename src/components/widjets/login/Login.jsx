import './Login.css';

import {
  useContext,
  useState,
} from 'react';

import { useNavigate } from 'react-router';

import { apiAuth } from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import { ROUTES } from '../../../shared/routesConfig';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiAuth.login(formData);

    setIsLoggedIn(true);

    navigate(ROUTES.depositList, { replace: true });
  };

  return (
    <div className="auth-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-field">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Войти
        </button>
      </form>
      <button onClick={() => navigate(ROUTES.register)} className="toggle-form-btn">
        Нет аккаунта? Зарегистрироваться
      </button>
    </div>
  )
}
