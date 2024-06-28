import { BaseModel, IBase } from "./BaseModel";
import { Model, SchemaDefinition } from "mongoose";

export interface IReview extends IBase{
    name: string;
    email: string;
    review: string;
    rating: number;
}

class ReviewModel extends BaseModel<IReview>{
    constructor(){
        const reviewSchemaDefinition: SchemaDefinition<IReview> = {
            name:{
                type: String, required: true,
            },
            email: {
                type: String, required: true,
            },
            review: {
                type: String, required: true,
            },
            rating: {
                type: Number, required: true
            }
        };
        super(reviewSchemaDefinition);
        this.schema.index({name: 'text'})
    }
    getModel(): Model<IReview> {
        return super.getModel('reviews')
    }
}
export default new ReviewModel().getModel();