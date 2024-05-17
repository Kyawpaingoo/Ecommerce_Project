import mongose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ContactModel = new mongose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    }
})

ContactModel.index({name: 'text'});
ContactModel.plugin(mongoosePaginate);

export default mongose.model('contacts', ContactModel);