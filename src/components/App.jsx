import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import tokenHelper from '../api';
import { AuthContext } from '../context/AuthContext';
import { ROUTES } from '../shared/routesConfig';
import './App.css';
import { Login } from './auth/Login';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Register } from './auth/Register';
import { AddDeposit } from './deposits/AddDeposit';
import { DepositList } from './deposits/deposits-list/DepositList';
import { DepositsHome } from './deposits/DepositsHome';
import { Layout } from './layout/Layout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tokenHelper.tryRefreshToken()
    .then(() => {
      setIsLoggedIn({ isLoggedIn: true });
      navigate(ROUTES.depositList, { replace: true });
    })
    .catch((err) => console.error(err));
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<ProtectedRoute element={<DepositsHome />} />}>
            <Route path={ROUTES.depositList} element={<DepositList />} />
            <Route path={ROUTES.addDeposit} element={<AddDeposit />} />
          </Route>
          <Route path={ROUTES.register} element={<Register />} />
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.default} element={<Navigate to={ROUTES.home} />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  )
}

export default App;
