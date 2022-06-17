import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

/**
 * It is an higher order component
 * which is used to render the children component or main component
 * depending on "userIsAuthorized" flag
 */
function PrivateRoute(props: any) {
    const { userIsAuthorized } = useSelector((state: RootState) => state.login);

    const { search } = useLocation();
    return userIsAuthorized ? props.children : <Navigate to={`/${search}`} />;
}

export default PrivateRoute;
