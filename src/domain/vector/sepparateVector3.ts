import { Scalar } from "../scalar/scalar";
import { IValueType } from "../valueType";

export class SepparateVector3 {
    constructor(private vector: IValueType) { }

    public getResult(): { x: IValueType, y: IValueType, z: IValueType } {
        const { x, y, z } = this.vector.getVector().getValue();

        return { x: new Scalar(x), y: new Scalar(y), z: new Scalar(z) }
    }
}
