export enum DataType {
    ValueType = 'valueType',
    Geometry = 'geometry',
}

export interface IDataType {
    getType(): DataType
}

export class Data {
    private _data: { [type: string]: IDataType } = {}
    private _type: DataType
    constructor(value: IDataType) {
        this._type = value.getType();
        this._data[this._type] = value;
    }

    get<T>(): T {
        return this._data[this._type] as T;
    }
}
