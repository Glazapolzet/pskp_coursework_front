import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
// import { apiAuth } from '../api';
import tokenHelper from '../api';
import { AuthContext } from '../context/AuthContext';
import { ROUTES } from '../shared/routesConfig';
import './App.css';
import { Login } from './auth/Login';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Register } from './auth/Register';
import { DepositList } from './deposits/DepositList';
import { Layout } from './layout/Layout';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tokenHelper.tryRefreshToken()
    .then(() => {
      setIsLoggedIn({ isLoggedIn: true });
      navigate(ROUTES.home, { replace: true });
    })
    .catch((err) => console.error(err));
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<ProtectedRoute element={
            <div>
              <DepositList />
            </div>
          } />}>
            {/* <Route index element={} /> */}
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
