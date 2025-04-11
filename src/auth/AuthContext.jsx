import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("checking token", token);
        
        if(token) {
            try {
                // get user info
                const userData = JSON.parse(localStorage.getItem("user"));
                if(userData) {
                    setUser(userData);
                }
                console.log("User data loaded from local storage:", userData);
            }catch(e) {
                console.log(`Error getting user info: ${e.message}`);
                localStorage.removeItem("token");
                setUser(null);
            }
        }

        setLoading(false);
    }, []);

    if(loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);