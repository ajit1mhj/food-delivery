import {  Sheet } from "@/components/ui/sheet"
import { SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const MobileNav =()=>{
    return(
        <Sheet>
            <SheetTrigger>
                <Menu className="text-blue-500"/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                  <span>Welcome to Food Delivery</span>  
                </SheetTitle>
                <Separator/>
                <SheetDescription>
                    <Button className="flex-1 font-bold bg-blue-500">Log In</Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav;