import { Geometry } from "../domain/geometry";
import { WebGPUDeviceLoader } from "./wrappers/deviceLoader";

export class WebGPUGeometryPayload {
    _verticesBuffer: GPUBuffer
    _indexesBuffer: GPUBuffer
    _indecesLength: number
    constructor(private _geometry: Geometry) {
        this._verticesBuffer = WebGPUDeviceLoader.instance.createBuffer({
            size: _geometry._positions.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })

        this._indexesBuffer = WebGPUDeviceLoader.instance.createBuffer({
            size: _geometry._indices.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })

        this._indecesLength = _geometry._indices.length
    }

    public get verticesBuffer(): GPUBuffer {
        return this._verticesBuffer
    }

    public get indexesBuffer(): GPUBuffer {
        return this._indexesBuffer
    }

    public get indecesLength(): number {
        return this._indecesLength
    }

    public writeToDevice() {
        WebGPUDeviceLoader.instance.writeBuffer(this._verticesBuffer, 0, this._geometry._positions)
        WebGPUDeviceLoader.instance.writeBuffer(this._indexesBuffer, 0, this._geometry._indices)
    }
}
