import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, ...rest }) => {
    const isLoggedin = useSelector((state) => state.user.isLoggedin);
    return isLoggedin ? <Route {...rest} element={element} /> : <Navigate to="/auth" />;
};

export default PrivateRoute;