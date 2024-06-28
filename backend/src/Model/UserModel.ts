import { BaseModel, IBase } from "./BaseModel";
import { Model, SchemaDefinition } from "mongoose";

export interface IUser extends IBase{
    name: string;
    email: string;
    password: string;
    role: string;
    gender: string;
    image: string;
}

class UserModel extends BaseModel<IUser>{
    constructor(){
        const userSchemaDefinition: SchemaDefinition<IUser> = {
            name: {
                type: String, required: true
            },
            email:{
                type: String, required: true
            },
            password: {
                type: String, required: true
            },
            role: {
                type: String, required: true
            },
            gender: {
                type: String, required: true
            },
            image: {
                type: String, required: true
            }
        };
        super(userSchemaDefinition);
        this.schema.index({name: 'text'});
    }

    getModel(): Model<IUser> {
        return super.getModel('users')
    }
}

export default new UserModel().getModel();