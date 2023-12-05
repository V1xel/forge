import { IDataType } from "./dataType";
import { Scalar } from "./scalar/scalar";
import { Vector3 } from "./vector/vector3";

export interface IValueType extends IDataType {
    getVector(): Vector3;
    getScalar(): Scalar;
}

export enum ValueType {
    Vector3 = 'vector3',
    Scalar = 'scalar',
}
