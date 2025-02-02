import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage =()=>{

    const navigate = useNavigate();
    const handelSearchSubmit =(searchFormValues: SearchForm)=>{
        navigate({
            pathname:`/search/${searchFormValues.searchQuery}`,
        })
    }
    return(
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex-col gap-5 text-center -mt-16">
                <h1 className="text-2xl font-bold tracking-tight text-blue-700">
                    Best food delivery service
                </h1>
                <span className="text-xl">Delivery is just one click away!</span>
                <SearchBar placeHolder="Search by City or food" onSubmit={handelSearchSubmit} searchQuery={""}/>
                </div>
        </div>
    )
}

export default HomePage;