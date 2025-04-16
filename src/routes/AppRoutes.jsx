import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignInPage.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import SignUp from "../pages/SignUpPage.jsx";
import TermsConditions from "../pages/TermsConditionsPage.jsx";
import Main from "../pages/MainPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            
            <Route 
                path="/*"
                element={
                    <ProtectedRoute>
                        <Main />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes;