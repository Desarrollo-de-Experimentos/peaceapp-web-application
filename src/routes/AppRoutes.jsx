import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignInPage.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            
            <Route 
                path="/"
                element={
                    <ProtectedRoute>
                        <h1>Home</h1>
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes;