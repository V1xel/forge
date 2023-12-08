import { DataType } from "../dataType"
import { Scalar } from "../scalar/scalar"
import { IValueType, ValueType } from "../valueType"
import { Vector3 } from "./vector3"

export class Vector4 implements IValueType {
    private _x: number
    private _y: number
    private _z: number
    private _w: number

    constructor(x: number | string, y: number | string, z: number | string, w: number | string) {
        this._x = Number(x)
        this._y = Number(y)
        this._z = Number(z)
        this._w = Number(w)
    }

    getValueType(): ValueType {
        return ValueType.Vector3
    }

    getType(): DataType {
        return DataType.ValueType
    }

    public getValue(): { x: number, y: number, z: number, w: number } {
        return {
            x: this._x,
            y: this._y,
            z: this._z,
            w: this._w,
        };
    }

    public getVector3() {
        const { _x, _y, _z } = this

        return new Vector3(_x, _y, _z)
    }

    public getVector4() {
        const { _x, _y, _z, _w } = this

        return new Vector4(_x, _y, _z, _w)
    }

    public getScalar(): Scalar {
        const { _x, _y, _z, _w } = this

        return new Scalar((_x + _y + _z + _w) / 3)
    }

    public toString(): string {
        const { _x, _y, _z, _w } = this

        return `x:${_x} y:${_y} z:${_z} w:${_w}`
    }
}