import mongose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const OrderSchema = new mongose.Schema({
    code:{
        type: String,
        required: true,
    },
    user:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    
    shipping_address: {
        type: String,
        required: true
    },
    status: {
        type: String, 
        required: true
    }
},{
    timestamps: true
})

OrderSchema.index({code: 'code'});
OrderSchema.plugin(mongoosePaginate);

export default mongose.model('orders', OrderSchema);