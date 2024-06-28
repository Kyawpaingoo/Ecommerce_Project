import { BaseModel, IBase } from "./BaseModel";
import { Model, SchemaDefinition } from "mongoose";

export interface ICategory extends IBase{
    slug: string;
    category: string;
}

class CategoryModel extends BaseModel<ICategory>{
    constructor(){
        const categorySchemaDefinition: SchemaDefinition<ICategory> ={
            slug: {
                type: String, required: true
            },
            category: {
                type: String, required: true
            }
        };
        super(categorySchemaDefinition);
        this.schema.index({slug: 'text'})
    }
    getModel(): Model<ICategory> {
        return super.getModel('categories')
    }
}

export default new CategoryModel().getModel();
