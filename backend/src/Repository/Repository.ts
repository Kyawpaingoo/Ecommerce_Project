import { Model } from "mongoose";
import { IRepository } from "./IRepository";

export class Repository<T> implements IRepository<T> {
    private readonly model = Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }
    async GetById(id: string): Promise<T> {
        try {
            return await this.model.findById(id).orFail().exec();
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }
    async GetAll(): Promise<T[]> {
        try{
            return await this.model.find().orFail().exec();
        }
        catch(error){
            throw new Error("Method not implemented.");
        }
        
    }
    async InsertReturnAsync(data: Partial<T>): Promise<T> {
        try{
            const result = await this.model.create(data);
            return result != null  ? result : null;
        }
        catch(error){
            throw new Error("Method not implemented.");
        }
    }
    async UpdateAsync(id: string, data: Partial<T>): Promise<T> {
        try{
            const result = await this.model.findByIdAndUpdate({_id: id}, data, {new: true});
            return result != null ? result : null;
        }
        catch(error){
            throw new Error("Method not implemented.");
        }
    }
    async DeleteAsync(id: string): Promise<boolean> {
        try{
            const result = await this.model.findByIdAndDelete({_id: id});
            return result != null;
        }
        catch(error){
            throw new Error("Method not implemented.");
        }
    }
}
