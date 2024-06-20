import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new mongoose.Schema({
    'name':{
        type: String,
        required: true,
    },
    'email':{
        type: String,
        required:true,
    },
    'password':{
        type: String,
        required: true,
    },
    'role':{
        type: String,
        required: true,
    },
    'gender':{
        type: String,
        required: true,
    },
    'image':{
        type: String,
        required: true,
    }
},{
    timestamps: true
})

UserSchema.index({name: 'text'});
UserSchema.plugin(mongoosePaginate);

export default mongoose.model('users', UserSchema);