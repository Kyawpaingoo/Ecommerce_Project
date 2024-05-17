import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    'slug': {
        type: String,
        required: true,
    },
    'category':{
        type: String,
        required: true,
    }
})

export default mongoose.model('categories', CategorySchema);