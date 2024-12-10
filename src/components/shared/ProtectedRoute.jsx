import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { ROUTES } from "../../shared/routesConfig";

export const ProtectedRoute = ({ element: Component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? Component : <Navigate to={ROUTES.login} replace={true} />
}

ProtectedRoute.propTypes = {
  element: PropTypes.element,
}
