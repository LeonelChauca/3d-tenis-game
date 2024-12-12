import { Navigate } from "react-router";
import PropTypes from "prop-types";
import store from "../store/store";

export const ProtectedRoute = ({ children }) => {
  const isAuth = store((state) => state.isAuth);
  return isAuth ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
