import { DataType } from "../dataType";
import { IValueType } from "../valueType";
import { Vector3 } from "../vector/vector3";

export class Scalar implements IValueType {
    constructor(private _scalar: number) { }

    getType(): DataType {
        return DataType.ValueType
    }

    public getVector() {
        const { _scalar } = this

        return new Vector3(_scalar, _scalar, _scalar)
    }

    public getScalar(): Scalar {
        const { _scalar } = this

        return new Scalar(_scalar);
    }

    public toString(): string {
        return this._scalar.toString();
    }
}
