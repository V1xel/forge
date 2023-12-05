import { DataType } from "../dataType"
import { Scalar } from "../scalar/scalar"
import { IValueType } from "../valueType"

export class Vector3 implements IValueType {
    private _x: number
    private _y: number
    private _z: number

    constructor(x: number | string, y: number | string, z: number | string) {
        this._x = Number(x)
        this._y = Number(y)
        this._z = Number(z)
    }

    getType(): DataType {
        return DataType.ValueType;
    }

    public getValue(): { x: number, y: number, z: number } {
        return {
            x: this._x,
            y: this._y,
            z: this._z,
        };
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