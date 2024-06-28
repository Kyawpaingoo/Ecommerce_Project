import { Document, FilterQuery } from "mongoose";

export class PaginateHelper <T extends Document>{
    private model: any;
    constructor(model: any){
        this.model = model
    }

    async paginateResult(page: number = 1, limit: number = 10, sortDir: string = '_id', sortVal: number = -1, conditions: FilterQuery<T>[] = []): Promise<any>{
        try{
            const query: FilterQuery<T> = conditions.length > 0 ? {$and: conditions} : {};

            const result = await this.model.paginate(query, {
                page: page,
                limit: limit,
                sort: {[sortDir]: sortVal}
            });
            return result;
        }
        catch(error){
            console.log('Error pagination data', error);
            throw error;
        }
    }
}