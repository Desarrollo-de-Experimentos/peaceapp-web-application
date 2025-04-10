import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if(token) {
            try {
                // get user info
            }catch(e) {
                console.log(`Error getting user info: ${e.message}`);
                localStorage.removeItem("token");
                setUser(null);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);