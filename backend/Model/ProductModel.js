import mongose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    color:[
        {
            _id:{type: String, required: true},
            color:{type: String, required: true}
        }
    ]
    ,
    like_count:{
        type: Number,
        default: 0,
    },
    stock:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        requied: true,
    },
    brand: {
        type: String,
            requied: true,
    },
    category: {
        type: String,
        requied: true,
    }
})

ProductSchema.index({name: 'text'});
ProductSchema.plugin(mongoosePaginate);

export default mongose.model('products', ProductSchema);