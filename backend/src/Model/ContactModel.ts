import { BaseModel, IBase } from "./BaseModel";
import { Model, SchemaDefinition } from "mongoose";

export interface IContact extends IBase{
    name: string;
    email: string;
    description: string;
}

class ContactModel extends BaseModel<IContact>{
    constructor(){
        const contactSchemaDefinition: SchemaDefinition<IContact> = {
            name: {
                type:String, required: true
            },
            email: {
                type: String, required: true
            },
            description: {
                type: String, required: true
            }
        }
        super(contactSchemaDefinition);
        this.schema.index({name: 'text'})
    }
    getModel(): Model<IContact> {
        return super.getModel('contacts')
    }
}

export default new ContactModel().getModel();