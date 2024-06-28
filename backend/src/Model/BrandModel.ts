import { BaseModel, IBase } from "./BaseModel";
import { Model, SchemaDefinition } from "mongoose";

export interface IBrand extends IBase{
    slug: string;
    brand: string;
}

class BrandModel extends BaseModel<IBrand>{
    constructor(){
        const brandSchemaDefinition: SchemaDefinition<IBrand> ={
            slug: {
                type: String, required: true
            },
            brand: {
                type: String, required: true
            }
        };
        super(brandSchemaDefinition);
        this.schema.index({slug: 'text'})
    }
    getModel(): Model<IBrand> {
        return super.getModel('brands')
    }
}

export default new BrandModel().getModel();
