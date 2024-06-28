export interface IRepository<T> {
    GetById(id: string): Promise<T>;
    GetAll(): Promise<T[]>;
    InsertReturnAsync(data: T): Promise<T>;
    UpdateAsync(id: string, data: T): Promise<T>;
    DeleteAsync(id: string): Promise<boolean>;
}