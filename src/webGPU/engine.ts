import { mat4, vec3 } from "wgpu-matrix";
import { Geometry } from "../domain/geometry";
import { WebGPUCanvas } from "./canvas";
import { RenderPipeline } from "./renderPipeline";

export class WebGPUEngine {
    public _canvas!: WebGPUCanvas;
    public adapter!: GPUAdapter;
    public _device!: GPUDevice;
    public _format!: any;
    public _context: any;
    public _geometry!: Geometry

    constructor(device: GPUDevice, format: GPUTextureFormat, geometry: Geometry,) {
        this._geometry = geometry
        this._device = device
        this._format = format
    }

    initialize() {

    }

    bindContext(canvas: WebGPUCanvas) {
        this._canvas = canvas
        this._context = this._canvas.getContext()
        this._context.configure({
            device: this._device,
            format: this._format,
            alphaMode: 'premultiplied',
        });
    }

    init(shader: string, color: { x: number, y: number, z: number }) {
        const pipeline = RenderPipeline.create(this._device, this._format, shader)

        const depthTexture = this._device.createTexture({
            size: [280, 280],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });

        const uniformBufferSize = 4 * 16; // 4x4 matrix
        const uniformBuffer = this._device.createBuffer({
            size: uniformBufferSize,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        const projectionMatrix = mat4.perspective(
            (2 * Math.PI) / 5,
            1,
            1,
            100
        );
        const modelViewProjectionMatrix = mat4.create();
        const _webGPU = this;
        function getTransformationMatrix() {
            const viewMatrix = mat4.identity();
            mat4.translate(viewMatrix, vec3.fromValues(0, 0, -1.42), viewMatrix);

            mat4.rotate(
                viewMatrix,
                vec3.fromValues(1, 0, 0),
                1.5708,
                viewMatrix
            );

            mat4.multiply(projectionMatrix, viewMatrix, modelViewProjectionMatrix);

            return modelViewProjectionMatrix as Float32Array;
        }
        const colorData = new Float32Array([color.x, color.y, color.z, 1.0]); // Red color

        function frame() {
            const renderPassDescriptor: GPURenderPassDescriptor = {
                colorAttachments: [
                    {
                        view: _webGPU._context.getCurrentTexture().createView(),
                        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0 },
                        loadOp: 'clear',
                        storeOp: 'store',
                    },
                ] as any,
                depthStencilAttachment: {
                    view: depthTexture.createView(),

                    depthClearValue: 1,
                    depthLoadOp: 'clear',
                    depthStoreOp: 'store',
                }
            };

            const colorBuffer = _webGPU._device.createBuffer({
                size: colorData.byteLength,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });

            const verticesBuffer = _webGPU._device.createBuffer({
                size: _webGPU._geometry._positions.byteLength,
                usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            });

            const indexesBuffer = _webGPU._device.createBuffer({
                size: _webGPU._geometry._indices.byteLength,
                usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
            });


            const uniformBindGroup = _webGPU._device.createBindGroup({
                layout: pipeline.getBindGroupLayout(0),
                entries: [
                    {
                        binding: 0,
                        resource: {
                            buffer: uniformBuffer,
                        },
                    },
                    {
                        binding: 1,
                        resource: {
                            buffer: colorBuffer,
                        },
                    }
                ],
            });

            _webGPU._device.queue.writeBuffer(verticesBuffer, 0, _webGPU._geometry._positions);
            _webGPU._device.queue.writeBuffer(indexesBuffer, 0, _webGPU._geometry._indices);

            const transformationMatrix = getTransformationMatrix();
            _webGPU._device.queue.writeBuffer(uniformBuffer, 0, transformationMatrix.buffer, transformationMatrix.byteOffset, transformationMatrix.byteLength);
            _webGPU._device.queue.writeBuffer(colorBuffer, 0, colorData.buffer, colorData.byteOffset, colorData.byteLength);

            const commandEncoder = _webGPU._device.createCommandEncoder();
            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
            passEncoder.setPipeline(pipeline);
            passEncoder.setBindGroup(0, uniformBindGroup);
            passEncoder.setVertexBuffer(0, verticesBuffer);
            passEncoder.setIndexBuffer(indexesBuffer, 'uint16');
            passEncoder.drawIndexed(_webGPU._geometry._indices.length);
            passEncoder.end();
            _webGPU._device.queue.submit([commandEncoder.finish()]);

            return requestAnimationFrame(frame)
        }

        return frame;
    }
}
