import mongose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ReviewSchema = new mongose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    }
})

ReviewSchema.index({name: 'text'});
ReviewSchema.plugin(mongoosePaginate);

export default mongose.model('reviews', ReviewSchema);