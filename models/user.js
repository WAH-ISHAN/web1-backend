import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //user kenkta aniwaren email ekk ona nisa email ekk ganwa habi eka uniqe mail ekk wenna ona
    email: { 
        type: String,
        required: true,//user kenk save weddi emaileka aniwaren ona nisai required ekk denne
        unique: true//email ekk aniwaren unique ekk wenna
    },
    FirstName:{
        type:String,
        required:true
        //unique krnne ekama namin inna ba ekama nama thawa kenkta thibboth eka unique neme
    },
    LastName:{
        type:String,
        required:true
    },
    UserType:{
        type:String,
        required:true,
        default:"user"//default ekk user ekk wenna
        //user type ekk kwru hari damme nathm e type eka blank thiyla issrahata giyoth auto user kiyna type eka selecte wenwa
    },
    Password:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true,
        default:"not given"//default ekk not given kiyla thiyaganna
    },
    isDisabled:{
        type:Boolean,
        required:true,
        default:false//default ekk false wenna mokda account eka create kra gamn account eka band wenna bari nisa
    },
    isEmailVerified:{
        type:Boolean,
        required:true,
        default:false//default ekk false wenna mokda account eka create kra gamn email eka verify wenna bari nisa
    },
})
const User = mongoose.model("User", userSchema);
export default User; 