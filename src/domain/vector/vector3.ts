import { DataType } from "../dataType"
import { Scalar } from "../scalar/scalar"
import { IValueType } from "../valueType"

export class Vector3 implements IValueType {
    constructor(private _x: number, private _y: number, private _z: number) { }

    getType(): DataType {
        return DataType.ValueType;
    }

    public getVector() {
        const { _x, _y, _z } = this

        return new Vector3(_x, _y, _z)
    }

    public getScalar(): Scalar {
        const { _x, _y, _z } = this

        return new Scalar((_x + _y + _z) / 3);
    }

    public toString(): string {
        const { _x, _y, _z } = this

        return `x:${_x} y:${_y} z:${_z}`
    }
}