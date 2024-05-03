import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Assuming jwt-decode is the default export
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface DecodedToken {
    exp?: number; // The expiration field can be optional
}

const ProtectedRoute: FC<Props> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return null;
        }
        const decoded: DecodedToken = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration === undefined) {
            // Handle the case where exp is undefined (e.g., force a refresh or logout)
            await refreshToken();
        } else if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
