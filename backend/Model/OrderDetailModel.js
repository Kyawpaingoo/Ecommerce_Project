import mongose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const OrderDetailSchema = new mongose.Schema({
    product:{
        type: mongose.Schema.ObjectId,
        ref:'products',
        required: true,
    },
    order_id:{
        type: mongose.Schema.ObjectId,
        ref:'orders',
        required: true,
    },
    
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number, 
        required: true
    }
})

OrderDetailSchema.index({product: 'text'});
OrderDetailSchema.plugin(mongoosePaginate);

export default mongose.model('order_details', OrderDetailSchema);