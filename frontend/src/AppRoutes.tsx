import  Layout  from "./layouts/layout" ;
import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import AuthCAllbackPage from "./pages/AuthCallbackpage";
import UserProfilePage from "./pages/UserProfilePage";

const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage/></Layout>} />
            <Route path="/auth-callback" element={<AuthCAllbackPage/>}/>
            <Route path="/user-profile" element={<Layout><UserProfilePage/></Layout>}/>
            <Route path="#" element={<Navigate to ="/"/>} />
        </Routes>
    )
       
    
}

export default AppRoutes;