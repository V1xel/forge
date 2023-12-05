import { IValueType } from "../valueType";
import { Vector3 } from "./vector3";

export class CombineVector3 {
    constructor(private _x: IValueType, private _y: IValueType, private _z: IValueType) { }

    public getResult(): IValueType {
        const x = this._x.getScalar().getValue()
        const y = this._y.getScalar().getValue()
        const z = this._z.getScalar().getValue()

        return new Vector3(x, y, z)
    }
}
