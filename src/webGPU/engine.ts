import { Matrix4 } from "../domain/matrix/matrix4";
import { Vector3 } from "../domain/vector/vector3";
import { WebGPUShaderPayload } from "./shaderPayload";
import { WebGPUCanvas } from "./wrappers/canvas";
import { WebGPUDevice } from "./wrappers/device";
import { WebGPUDeviceLoader } from "./wrappers/deviceLoader";
import { Geometry } from "../domain/geometry";
import { WebGPUGeometryPayload } from "./geometryPayload";

export class WebGPUEngine {
    device: WebGPUDevice
    pipeline!: GPURenderPipeline
    shaderPayload!: WebGPUShaderPayload
    geometryPayload!: WebGPUGeometryPayload
    constructor(private _canvas: WebGPUCanvas) {
        this.device = WebGPUDeviceLoader.instance
        _canvas.bindContext(this.device)
    }

    public initialize(geometry: Geometry, shader: string, { color, transform }: { color: Vector3, transform: Matrix4 }) {
        this.pipeline = this.device.createRenderPipeline(shader)
        this.shaderPayload = new WebGPUShaderPayload(this.pipeline, color, transform)
        this.geometryPayload = new WebGPUGeometryPayload(geometry)
    }

    public makeRenderPassDescriptor(): GPURenderPassDescriptor {
        return {
            colorAttachments: [
                {
                    view: this._canvas.createView(),
                    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0 },
                    loadOp: 'clear',
                    storeOp: 'store',
                },
            ]
        }
    }

    public draw(): void {
        this.shaderPayload.writeToDevice()
        this.geometryPayload.writeToDevice()

        const encoder = this.device.createCommandEncoder()
        const passEncoder = encoder.beginRenderPass(this.makeRenderPassDescriptor())
        passEncoder.setPipeline(this.pipeline)
        passEncoder.setBindGroup(0, this.shaderPayload.getBindingGroup())
        passEncoder.setVertexBuffer(0, this.geometryPayload.verticesBuffer)
        passEncoder.setIndexBuffer(this.geometryPayload.indexesBuffer, 'uint16')
        passEncoder.drawIndexed(this.geometryPayload.indecesLength)
        passEncoder.end()

        this.device.submit([encoder.finish()])
    }

    public loop(): () => void {
        this.draw()
        const animationFrameId = requestAnimationFrame(this.loop.bind(this))

        return () => cancelAnimationFrame(animationFrameId)
    }
}