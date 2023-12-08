import { DataType } from "../dataType"
import { Scalar } from "../scalar/scalar"
import { IValueType, ValueType } from "../valueType"
import { Vector3 } from "../vector/vector3"
import { Vector4 } from "../vector/vector4"

export class Matrix4 implements IValueType {
    private _row1: Vector4
    private _row2: Vector4
    private _row3: Vector4
    private _row4: Vector4

    constructor(row1: IValueType, row2: IValueType, row3: IValueType, row4: IValueType) {
        this._row1 = row1.getVector4()
        this._row2 = row2.getVector4()
        this._row3 = row3.getVector4()
        this._row4 = row4.getVector4()
    }
    getVector4(): Vector4 {
        const { _row1, _row2, _row3, _row4 } = this
        const { x } = _row1.getValue()
        const { y } = _row2.getValue()
        const { z } = _row3.getValue()
        const { w } = _row4.getValue()

        return new Vector4(x, y, z, w)
    }

    getValueType(): ValueType {
        return ValueType.Matrix4
    }

    getType(): DataType {
        return DataType.ValueType
    }

    public getValue(): {
        row1: { x: number, y: number, z: number, w: number },
        row2: { x: number, y: number, z: number, w: number },
        row3: { x: number, y: number, z: number, w: number },
        row4: { x: number, y: number, z: number, w: number }
    } {
        return {
            row1: this._row1.getValue(),
            row2: this._row2.getValue(),
            row3: this._row3.getValue(),
            row4: this._row4.getValue(),
        };
    }

    public getVector3() {
        const { _row1, _row2, _row3 } = this
        const { x } = _row1.getValue()
        const { y } = _row2.getValue()
        const { z } = _row3.getValue()

        return new Vector3(x, y, z)
    }

    public getScalar(): Scalar {
        const { _row1, _row2, _row3 } = this
        const { x } = _row1.getValue()
        const { y } = _row2.getValue()
        const { z } = _row3.getValue()

        return new Scalar((x + y + z) / 3)
    }

    public toString(): string {
        const { _row1, _row2, _row3, _row4 } = this
        const r1 = _row1.getValue()
        const r2 = _row2.getValue()
        const r3 = _row3.getValue()
        const r4 = _row4.getValue()

        return `
        row1: x:${r1.x} y:${r1.y} z:${r1.z} w:${r1.w}
        row2: x:${r2.x} y:${r2.y} z:${r2.z} w:${r2.w}
        row3: x:${r3.x} y:${r3.y} z:${r3.z} w:${r3.w}
        row4: x:${r4.x} y:${r4.y} z:${r4.z} w:${r4.w}
        `
    }
}