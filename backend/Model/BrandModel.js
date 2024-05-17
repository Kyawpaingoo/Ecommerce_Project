import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    'slug': {
        type: String,
        required: true,
    },
    'brand':{
        type: String,
        required: true,
    }
});

export default mongoose.model('brands', BrandSchema);