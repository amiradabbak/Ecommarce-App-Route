import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { UserContext } from "../../Context/User.context";
export default function ProtectedRoute({ children }) {
        //? My variables 
        const { token } = useContext(UserContext)
        //& Check user sign in before or no  
        if (token) {
                return children;
        } else {
                return <Navigate to={"auth/login"} />
        }
}