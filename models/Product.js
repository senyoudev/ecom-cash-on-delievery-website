import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    sizes:
        [{
            type:String
        }]
    ,
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
},{
    timestamps:true
})


const Product = await mongoose.model('Products',productSchema)


export default Product