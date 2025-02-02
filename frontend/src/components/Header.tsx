import { Link } from "react-router-dom"
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = ()=>{
    return (
        <div className="border-b-2 border-b-blue-500 py-6 color-blue-100">
            <div className="container mx-auto flex justify-between items-center">
                <Link 
                to="/"
                className="text-2xl font-bold tracking-tight text-lightblue-500">
                QuickFood
                </Link>
                <div className="md:hidden">
                    <MobileNav />
                </div>
                <div className="hidden md:block" >
                    <MainNav/>
                </div>
            </div>
        </div>
    )
}
export default Header;