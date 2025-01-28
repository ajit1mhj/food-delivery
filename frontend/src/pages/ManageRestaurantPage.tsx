import { useCreateMyRestaurant, useGetMyRestaurnt } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-resturant-form/ManageRestaurantForm";

const ManageRestaurantPage =()=>{
    const {createRestaurant,isLoading}=useCreateMyRestaurant();

    const {restaurant} = useGetMyRestaurnt();
    return <ManageRestaurantForm restaurant={restaurant} onSave={createRestaurant} isLoading={isLoading}/>
};

export default ManageRestaurantPage;