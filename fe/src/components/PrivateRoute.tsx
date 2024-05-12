import { useContext, useState } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AppSettingsContext } from "../App";


function PrivateRoute({ children }: RouteProps): JSX.Element {
    let appSettingsContext = useContext(AppSettingsContext);
    return (
        <>
            {
                appSettingsContext._isUserLoggedIn || appSettingsContext._isLocalStorage ? children : <Navigate to="/login" />
            }
        </>
    );
}

export default PrivateRoute;