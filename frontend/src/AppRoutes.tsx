import  Layout  from "./layouts/layout" ;
import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import AuthCAllbackPage from "./pages/AuthCallbackpage";

const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Layout><HomePage/></Layout>} />
            <Route path="/auth-callback" element={<AuthCAllbackPage/>}/>
            <Route path="/user-profile" element={<span>USER PROFILE PAGE</span>} />
            <Route path="#" element={<Navigate to ="/"/>} />
        </Routes>
    )
       
    
}

export default AppRoutes;