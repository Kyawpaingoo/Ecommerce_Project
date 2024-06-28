import { BaseModel, IBase } from "./BaseModel";
import { Model, SchemaDefinition } from "mongoose";

export interface IColor extends IBase{
    slug: string;
    color: string;
}

class ColorModel extends BaseModel<IColor>{
    constructor(){
        const colorSchemaDefintion: SchemaDefinition<IColor> ={
            slug: {
                type: String, required: true
            },
            color: {
                type: String, required: true
            }
        };
        super(colorSchemaDefintion);
        this.schema.index({slug: 'text'})
    }
    getModel(): Model<IColor> {
        return super.getModel('colors')
    }
}

export default new ColorModel().getModel();
