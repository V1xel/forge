import { Scalar } from "../scalar/scalar";
import { IValueType } from "../valueType";
import { Vector3 } from "./vector3";

export enum Vector3OperationType {
    Add = 'add',
    Multiply = 'multiply',
    Dot = 'dot',
}

export class Vector3Operation {
    constructor(private _s1: IValueType, private _s2: IValueType, private _type: Vector3OperationType) { }

    public add(): IValueType {
        const v1 = this._s1.getVector().getValue()
        const v2 = this._s2.getVector().getValue()
        const result = { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z }

        return new Vector3(result.x, result.y, result.z)
    }

    public multiply(): IValueType {
        const v1 = this._s1.getVector().getValue()
        const v2 = this._s2.getVector().getValue()
        const result = { x: v1.x * v2.x, y: v1.y * v2.y, z: v1.z * v2.z }

        return new Vector3(result.x, result.y, result.z)
    }

    public dot(): IValueType {
        const v1 = this._s1.getVector().getValue()
        const v2 = this._s2.getVector().getValue()

        return new Scalar(v1.x * v2.x + v1.y * v2.y + v1.z * v2.z)
    }

    public getResult(): IValueType {
        return this[this._type]()
    }
}
