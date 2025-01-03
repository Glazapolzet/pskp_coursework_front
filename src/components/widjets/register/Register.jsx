import './Register.css';

import { useState } from 'react';

import { useNavigate } from 'react-router';

import { apiAuth } from '../../../api';
import { ROUTES } from '../../../shared/routesConfig';

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user' // Предустановленная роль по умолчанию
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiAuth.register(formData);

    navigate(ROUTES.login);
  };

  return (
    <div className="auth-container">
      <h2>Регистрация</h2>
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
        <div className="form-field">
          <label htmlFor="role">Роль</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="user">Пользователь</option>
            <option value="manager">Менеджер</option>
            <option value="admin">Администратор</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Зарегистрироваться
        </button>
      </form>
      <button onClick={() => navigate(ROUTES.login)} className="toggle-form-btn">
        Уже зарегистрированы? Войти
      </button>
    </div>
  )
}
