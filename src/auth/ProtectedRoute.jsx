import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    /**
     * ProtectedRoute component checks if the user is authenticated.
     * If not, it redirects to the sign-in page.
     */
    
    // useAuth is a custom hook that provides the authentication context
    // and the user object containing user information.
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/sign-in" replace/>;
    }
    return children;
}

export default ProtectedRoute;