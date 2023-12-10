import { Geometry } from "../domain/geometry";
import { Matrix4 } from "../domain/matrix/matrix4";
import { Vector3 } from "../domain/vector/vector3";
import { TransformationMatrix } from "./helpers/transformationMatrix";
import { WebGPUDeviceLoader } from "./wrappers/deviceLoader";

export class WebGPUShaderPayload {
    _color: Vector3;
    _colorSize = 4 * 4

    _transform: Matrix4;
    _transformSize = 4 * 4 * 4;

    _uvsBuffer: GPUBuffer
    _buffer: GPUBuffer
    _pipeline: GPURenderPipeline
    constructor(pipeline: GPURenderPipeline, color: Vector3, transform: Matrix4, private _geometry: Geometry) {
        this._pipeline = pipeline
        this._color = color
        this._transform = transform
        this._buffer = WebGPUDeviceLoader.instance.createBuffer({
            size: this._colorSize + this._transformSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        })

        this._uvsBuffer = WebGPUDeviceLoader.instance.createBuffer({
            size: _geometry._uvs.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        })
    }

    getBindingGroup(): GPUBindGroup {

        const cubeTexture = WebGPUDeviceLoader.instance.createTexture({
            size: [800, 800, 1],
            format: 'rgba8unorm',
            usage:
                GPUTextureUsage.TEXTURE_BINDING |
                GPUTextureUsage.COPY_DST |
                GPUTextureUsage.RENDER_ATTACHMENT,
        });

        WebGPUDeviceLoader.instance.copyExternalImageToTexture(
            { source: WebGPUDeviceLoader.image },
            { texture: cubeTexture },
            [800, 800]
        );

        const sampler = WebGPUDeviceLoader.instance.createSampler({
            magFilter: 'linear',
            minFilter: 'linear',
        });

        return WebGPUDeviceLoader.instance.createBindGroup({
            layout: this._pipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding: 0,
                    resource: {
                        buffer: this._buffer,
                    },
                },
                {
                    binding: 1,
                    resource: sampler as any
                },
                {
                    binding: 2,
                    resource: cubeTexture.createView()
                },
                {
                    binding: 3,
                    resource: {
                        buffer: this._uvsBuffer
                    }
                }
            ],
        })
    }

    writeToDevice() {
        const matrix = TransformationMatrix.getProjectionMatrix(this._transform)
        WebGPUDeviceLoader.instance.writeBuffer(this._buffer, 0, matrix.buffer, matrix.byteOffset, matrix.byteLength)

        const { x, y, z } = this._color.getValue()
        const color = new Float32Array([x, y, z, 1.0]);
        WebGPUDeviceLoader.instance.writeBuffer(this._buffer, this._transformSize, color.buffer, color.byteOffset, color.byteLength)

        WebGPUDeviceLoader.instance.writeBuffer(this._uvsBuffer, 0, this._geometry._uvs)
    }
}
