import { mat4, vec3 } from "wgpu-matrix";
import { Geometry } from "../domain/geometry";
import { WebGPUCanvas } from "./canvas";

export class WebGPU {
    public _canvas!: WebGPUCanvas;
    public adapter!: GPUAdapter;
    public _device!: GPUDevice;
    public _format!: any;
    public _context: any;
    public _geometry!: Geometry

    init(canvas: WebGPUCanvas, device: GPUDevice, format: GPUTextureFormat, geometry: Geometry, shader: string) {
        this._geometry = geometry
        this._canvas = canvas
        this._device = device
        this._context = this._canvas.getContext()
        this._format = format

        this._context.configure({
            device: this._device,
            format: this._format,
            alphaMode: 'premultiplied',
        });

        const pipeline = this._device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: this._device.createShaderModule({
                    code: shader,
                }),
                entryPoint: 'mainVertex',
                buffers: [
                    {
                        arrayStride: 12,
                        attributes: [
                            {
                                // position
                                shaderLocation: 0,
                                offset: 0,
                                format: 'float32x3',
                            }
                        ],
                    },
                ],
            },
            fragment: {
                module: this._device.createShaderModule({
                    code: shader,
                }),
                entryPoint: 'mainFragment',
                targets: [
                    {
                        format: this._format,
                    },
                ],
            },
            primitive: {
                topology: 'triangle-list',
                // Backface culling since the cube is solid piece of geometry.
                // Faces pointing away from the camera will be occluded by faces
                // pointing toward the camera.
                cullMode: 'back',
            },

            // Enable depth testing so that the fragment closest to the camera
            // is rendered in front.
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus',
            },
        });

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

        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [
                {
                    view: undefined,

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

        const projectionMatrix = mat4.perspective(
            (2 * Math.PI) / 5,
            1,
            1,
            100
        );
        const modelViewProjectionMatrix = mat4.create();
        const _webGPU = this;
        function getTransformationMatrix() {
            const now = Date.now() / 1000;

            const viewMatrix = mat4.identity();
            mat4.translate(viewMatrix, vec3.fromValues(0, 0, -4), viewMatrix);

            mat4.rotate(
                viewMatrix,
                vec3.fromValues(Math.cos(now), 0, Math.sin(now)),
                1,
                viewMatrix
            );

            mat4.multiply(projectionMatrix, viewMatrix, modelViewProjectionMatrix);

            return modelViewProjectionMatrix as Float32Array;
        }


        function frame() {
            const colorData = new Float32Array([1, 0, 0, 1.0]); // Red color

            // Create a GPU buffer for the color data
            const colorBuffer = _webGPU._device.createBuffer({
                size: colorData.byteLength,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            _webGPU._device.queue.writeBuffer(colorBuffer, 0, colorData.buffer, colorData.byteOffset, colorData.byteLength);

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

            const verticesBuffer = _webGPU._device.createBuffer({
                size: _webGPU._geometry._positions.byteLength,
                usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            });

            _webGPU._device.queue.writeBuffer(verticesBuffer, 0, _webGPU._geometry._positions);

            const indexesBuffer = _webGPU._device.createBuffer({
                size: _webGPU._geometry._indices.byteLength,
                usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
            });

            _webGPU._device.queue.writeBuffer(indexesBuffer, 0, _webGPU._geometry._indices);

            const transformationMatrix = getTransformationMatrix();
            _webGPU._device.queue.writeBuffer(
                uniformBuffer,
                0,
                transformationMatrix.buffer,
                transformationMatrix.byteOffset,
                transformationMatrix.byteLength
            );
            (renderPassDescriptor.colorAttachments as any)[0].view = _webGPU._context
                .getCurrentTexture()
                .createView();

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
