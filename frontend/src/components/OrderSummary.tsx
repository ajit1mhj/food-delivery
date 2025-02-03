import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { CartItem } from "@/pages/DetailPage";
import { Trash } from "lucide-react";

type Props ={
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart:(CartItem:CartItem)=> void
}

const OrderSummary =({restaurant,cartItems,removeFromCart}:Props)=>{

    const getTotalCost =()=>{
         const TotalInNPR = cartItems.reduce(
            (total,cartItems) => total + cartItems.price * cartItems.quantity,0)

            const totalWithDelivery = (TotalInNPR + restaurant.deliveryPrice)

            return totalWithDelivery 
    }


    return(
        <>
        <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
            <span>Your Order</span>
            <span>NPR {getTotalCost()}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
        {
            cartItems.map((item)=>(
                <div className="flex justify-between">
                    <span>
                        <Badge variant="outline" className="mr-2">
                            {item.quantity}
                        </Badge>
                        {item.name}
                    </span>
                    <span className="flex items-center gap-1">
                        <Trash className="cursor-pointer" color="red" size={20}
                        onClick={()=>removeFromCart(item)}/>
                    NPR {(item.price * item.quantity)}
                    </span>
                </div>
            ))}
            <Separator/>
            <div className="flex justify-between">
                <span>Delivery</span>
                <span>NPR {(restaurant.deliveryPrice)}</span>
            </div>
            <Separator/>
        </CardContent>
        </>
    )
} 

export default OrderSummary;