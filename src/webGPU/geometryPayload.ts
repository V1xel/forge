import { Geometry } from "../domain/geometry";
import { WebGPUDeviceLoader } from "./wrappers/deviceLoader";

export class WebGPUGeometryPayload {
    _verticesBuffer: GPUBuffer
    _normalsBuffer: GPUBuffer
    _uvsBuffer: GPUBuffer
    _indexesBuffer: GPUBuffer
    _indecesLength: number
    _verticesLength: number
    constructor(private _geometry: Geometry) {
        this._verticesBuffer = WebGPUDeviceLoader.instance.createBuffer({
            size: _geometry._positions.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })

        this._normalsBuffer = WebGPUDeviceLoader.instance.createBuffer({
            size: _geometry._normals.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })

        this._uvsBuffer = WebGPUDeviceLoader.instance.createBuffer({
            size: _geometry._uvIndexes.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })

        this._verticesBuffer = WebGPUDeviceLoader.instance.createBuffer({
            size: _geometry._positions.byteLength,
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        })

        this._indexesBuffer = WebGPUDeviceLoader.instance.createBuffer({
            size: _geometry._indices.byteLength,
            usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
        })

        this._verticesLength = _geometry._positions.length
        this._indecesLength = _geometry._indices.length
    }

    public get verticesBuffer(): GPUBuffer {
        return this._verticesBuffer
    }

    public get normalsBuffer(): GPUBuffer {
        return this._normalsBuffer
    }

    public get uvsBuffer(): GPUBuffer {
        return this._uvsBuffer
    }

    public get indexesBuffer(): GPUBuffer {
        return this._indexesBuffer
    }

    public get indecesLength(): number {
        return this._indecesLength
    }

    public get verticesLength(): number {
        return this._verticesLength
    }

    public writeToDevice() {
        WebGPUDeviceLoader.instance.writeBuffer(this._verticesBuffer, 0, this._geometry._positions)
        WebGPUDeviceLoader.instance.writeBuffer(this._normalsBuffer, 0, this._geometry._normals)
        WebGPUDeviceLoader.instance.writeBuffer(this._uvsBuffer, 0, this._geometry._uvIndexes)
        WebGPUDeviceLoader.instance.writeBuffer(this._indexesBuffer, 0, this._geometry._indices)
    }
}
