import { DataType, IDataType } from "../dataType";
import { Scalar } from "../scalar/scalar";
import { IValueType } from "../valueType";

export class SeparateVector3 {
    constructor(private vector: IDataType) { }

    public getResult(): { x: IValueType, y: IValueType, z: IValueType } {
        if (this.vector.getType() !== DataType.ValueType)
            throw new Error('Separate Vector3 designed to work only with ValueType')
        const valueType = this.vector as IValueType

        const { x, y, z } = valueType.getVector3().getValue();
        return { x: new Scalar(x), y: new Scalar(y), z: new Scalar(z) }
    }
}
