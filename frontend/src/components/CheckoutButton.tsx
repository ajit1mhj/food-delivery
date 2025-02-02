import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

const CheckoutButton=()=>{
    const {isAuthenticated,isLoading,loginWithRedirect} = useAuth0();

    const {pathname}= useLocation();

    if(!isAuthenticated){
        
    }
}
export default CheckoutButton;