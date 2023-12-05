import { IValueType } from "../valueType";
import { Scalar } from "./scalar";

export enum ScalarOperationType {
    Add = 'add',
    Multiply = 'multiply',
}

export class ScalarOperation {
    constructor(private _s1: IValueType, private _s2: IValueType, private _type: ScalarOperationType) { }

    public add(): IValueType {
        const s1 = this._s1.getScalar()
        const s2 = this._s2.getScalar()
        const result = s1.getValue() + s2.getValue();

        return new Scalar(result)
    }

    public multiply(): IValueType {
        const s1 = this._s1.getScalar()
        const s2 = this._s2.getScalar()
        const result = s1.getValue() * s2.getValue();

        return new Scalar(result)
    }

    public getResult(): IValueType {
        return this[this._type]()
    }
}
