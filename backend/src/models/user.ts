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
    country:{
        type: String,
    },
    phoneNumber:{
        type: Number,
    },
})

const User = mongoose.model("User",userSchema);
export default User;