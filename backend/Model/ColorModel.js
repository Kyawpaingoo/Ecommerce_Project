import mongoose from "mongoose";
const ColorShcema = new mongoose.Schema({
    'slug': {
        type: String,
        required: true,
    },
    'color':{
        type: String,
        required: true
    }
});

export default mongoose.model('colors', ColorShcema);