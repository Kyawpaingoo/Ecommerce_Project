import { Document, Model } from "mongoose";

export const getSpecificData = async <T extends Document>(model : Model<T>, limit: number, sortData: keyof T, sortVal: 1 | -1) : Promise<T[]>=>{
    try{
        const result = await model.find().limit(limit).sort({[sortData]: sortVal});
        return result;
    }
    catch(error){
        throw new Error('Error');
    }
}
