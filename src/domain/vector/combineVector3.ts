import { IValueType } from "../valueType";
import { Vector3 } from "./vector3";

export class CombineVector3 {
    constructor(private x: IValueType, private y: IValueType, private z: IValueType) { }

    public getResult(): IValueType {
        const x = this.x.getScalar().getValue()
        const y = this.y.getScalar().getValue()
        const z = this.z.getScalar().getValue()

        return new Vector3(x, y, z)
    }
}
