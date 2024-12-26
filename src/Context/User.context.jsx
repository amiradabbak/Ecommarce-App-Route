import { createContext, useState } from "react";
export const UserContext = createContext(0)
export default function UserProvider({ children }) {
    //? My variables
    const [token, setToken] = useState(localStorage.getItem("token"))
    //! User logout 
    function logout() {
        setToken(null)
        localStorage.removeItem("token")
    }

    return <UserContext.Provider value={{ token, setToken, logout }}>
        {children}
    </UserContext.Provider>
}