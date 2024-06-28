import mongoose from "mongoose";

const GenderSchema = new mongoose.Schema({
    'slug': {
        type: String,
        required: true,
    },
    'gender':{
        type: String,
        required: true,
    }
});

export default mongoose.model('genders', GenderSchema);