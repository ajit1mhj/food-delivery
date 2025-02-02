import {  Sheet } from "@/components/ui/sheet"
import { SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { CircleUserRound, Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav =()=>{
    const { isAuthenticated , loginWithRedirect , user} = useAuth0();
    return(
        <Sheet>
            <SheetTrigger>
                <Menu className="text-blue-500"/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ?
                    (<span className="flex items-center font-bol gap-2">
                        <CircleUserRound className="text-blue-500"/>
                    </span>) :(
                    <span>Welcome to Food Delivery</span>)}
                    
                </SheetTitle>
                <Separator/>
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? (<MobileNavLinks/>):(
                        <Button
                        onClick={()=> loginWithRedirect()}
                        className="flex-1 font-bold bg-blue-500">Log In</Button>
                    )}
                    
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav;