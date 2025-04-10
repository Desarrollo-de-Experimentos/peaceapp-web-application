import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    /**
     * ProtectedRoute component checks if the user is authenticated.
     * If not, it redirects to the sign-in page.
     */
    
    // useAuth is a custom hook that provides the authentication context
    // and the user object containing user information.
    const { user, loading } = useAuth();

    if (loading) {
        // If loading, show a loading spinner or message
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    if (!user) {
        console.log("User not authenticated, redirecting to sign-in page.");
        return <Navigate to="/sign-in" replace/>;
    }
    return children;
}

export default ProtectedRoute;