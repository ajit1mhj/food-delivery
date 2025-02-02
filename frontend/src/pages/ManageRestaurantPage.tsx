import { useCreateMyRestaurant, useGetMyRestaurant, useupdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-resturant-form/ManageRestaurantForm";

const ManageRestaurantPage =()=>{
    const {createRestaurant,isLoading: isCreateLoading}=useCreateMyRestaurant();

    const {restaurant} = useGetMyRestaurant();
    const{updateRestaurant,isLoading: isUpdateLoading } = useupdateMyRestaurant();

    const isEditing = !!restaurant;

    return <ManageRestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant: createRestaurant} isLoading={isCreateLoading || isUpdateLoading}/>
};

export default ManageRestaurantPage;