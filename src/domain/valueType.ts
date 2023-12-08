import { IDataType } from "./dataType";
import { Scalar } from "./scalar/scalar";
import { Vector3 } from "./vector/vector3";
import { Vector4 } from "./vector/vector4";

export interface IValueType extends IDataType {
    getVector3(): Vector3
    getVector4(): Vector4
    getScalar(): Scalar
    getValueType(): ValueType
}

export enum ValueType {
    Matrix4 = 'matrix4',
    Vector4 = 'vector4',
    Vector3 = 'vector3',
    Scalar = 'scalar',
}
