import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Separator } from "@radix-ui/react-separator";
import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const UsernameMenu =()=>{
    const {user,logout} = useAuth0();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-blue-500 gap-2">
            <CircleUserRound className="text-blue-500">
            {user?.email}
            </CircleUserRound>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                <Link to="/user-profile" className="font-bold hover:text-blue-600">
                User Profile
                </Link>
                </DropdownMenuItem>
               <Separator>
                <DropdownMenuItem>
                    <Button onClick={()=> logout()}
                    className="flex flex-1 font-bold bg-blue-500">
                        Log Out
                    </Button>
                </DropdownMenuItem>
               </Separator>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



export default UsernameMenu;