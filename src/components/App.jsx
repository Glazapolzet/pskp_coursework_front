import './App.css';

import {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router';

import tokenHelper, { apiAuth } from '../api';
import { AuthContext } from '../context/AuthContext';
import { ROUTES } from '../shared/routesConfig';
import {
  Footer,
  Header,
  Main,
} from './layout';
import { Home } from './pages';
import { ProtectedRoute } from './shared';
import {
  AddDeposit,
  DepositList,
  Login,
  Register,
} from './widjets';

const Layout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    await apiAuth.logout();

    tokenHelper.clearLocalTokens();
    setIsLoggedIn(false);

    navigate(ROUTES.login);
  }

  return (
    <>
        <Header logoutButton={<button onClick={logout} className="header-quit-button">Выход</button>} />
        <Main />
        <Footer />
    </>
  )
}

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
          <Route path={ROUTES.home} element={<ProtectedRoute element={<Home />} />}>
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
