import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuPrice from "@/components/MenuPrice";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { MenuItem } from "@/types";


export type CartItem = {
    _id: string;
    name:string;
    price:number;
    quantity: number;
}


const DetailPage = ()=>{
    const {restaurantId}= useParams();
    const {restaurant,isLoading}= useGetRestaurant(restaurantId);

    const [cartItems,setCartItems] = useState<CartItem[]>([]);

   

    const addToCart = (menuItem:MenuItem) =>{
        setCartItems((prevCartItems)=>{
            //1 check if the item is already in cart
            const exisitingCartItem = prevCartItems.find((cartItems)=>cartItems._id=== menuItem._id)
             let updatedCartItems;
            //2. if item is in card, update the quantity
             if(exisitingCartItem){
                updatedCartItems = prevCartItems.map((cartItems)=>cartItems._id === menuItem._id
                ?{...cartItems,quantity:cartItems.quantity+1}:cartItems)
             }
             //if the item is not in the cart
             else{
                updatedCartItems=[
                    ...prevCartItems,{
                        _id:menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity:1,
                    }
                ]
             }
            
             return updatedCartItems;
        })

    }
    const removeFromCart = (cartItems:CartItem)=>{
        setCartItems((prevCartItems)=>{
            const updatedCartItems = prevCartItems.filter((item)=> cartItems._id !== item._id)

            return updatedCartItems;
        })
    }
    if(isLoading || !restaurant){
        return "Loading..";
    }

    return(
        <div className="flex flex-col gap-10">
        <AspectRatio ratio={16 / 5}>
          <img
            src={restaurant.imageUrl}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
            <div className="flex flex-col gap-4">
                <RestaurantInfo restaurant={restaurant}/>
                <span className="text-2xl font-bold tracking-tight">
                   Menu 
                </span>
                {restaurant.menuItems.map((menuItem)=>(
                    <MenuPrice menuItem={menuItem} addToCart={()=>addToCart(menuItem)}/>
                ))}
            </div>

            <div>
                <Card>
                    <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart}/>
                    <CardFooter>
                        <CheckoutButton/>
                    </CardFooter>
                </Card>
            </div>
             </div>
        
        </div>
    ) 
}

export default DetailPage;