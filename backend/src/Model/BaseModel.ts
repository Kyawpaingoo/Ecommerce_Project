import {Document, Schema, Model, model, SchemaDefinition} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
export interface IBase extends Document {
    createdAt?: Date;
    updatedAt?: Date;
}

export class BaseModel<T extends Document>{
    protected schema: Schema;
    private model?: Model<T>;

    constructor(schemaDefinition: SchemaDefinition<T>){
        this.schema = new Schema(schemaDefinition, {
            timestamps: true
        });
        this.schema.plugin(mongoosePaginate);
    }

    getModel(name: string): Model<T>{
        if(!this.model){
            this.model = model<T>(name, this.schema)
        }
        return this.model
    }
}

