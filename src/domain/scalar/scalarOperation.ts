import { IValueType } from "../valueType";
import { Scalar } from "./scalar";

export enum ScalarOperationType {
    Add = 'add',
    Multiply = 'multiply',
}

export class ScalarOperation {
    private _type: ScalarOperationType = ScalarOperationType.Add
    constructor(private _s1: IValueType, private _s2: IValueType) { }

    public setType(type: ScalarOperationType) {
        this._type = type;
    }

    private add(): IValueType {
        const s1 = this._s1.getScalar()
        const s2 = this._s2.getScalar()
        const result = s1.getValue() + s2.getValue();

        return new Scalar(result)
    }

    private multiply(): IValueType {
        const s1 = this._s1.getScalar()
        const s2 = this._s2.getScalar()
        const result = s1.getValue() * s2.getValue();

        return new Scalar(result)
    }

    public getResult(): IValueType {
        return this[this._type]()
    }
}
