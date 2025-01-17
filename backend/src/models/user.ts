import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id:{
        type:String,
        require: true
    },
    email:{
        type:String,
    },
    name:{
        type: String,
    },
    addressLine1:{
        type: String,
    },
    city:{
        type: String,
    },
    Country:{
        type: String,
    },
})

const User = mongoose.model("User",userSchema);
export default User;