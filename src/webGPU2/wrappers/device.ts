export class WebGPUDevice {
    constructor(public rawDevice: GPUDevice, public format: GPUTextureFormat) { }

    createRenderPipeline(shaderSource: string) {
        return this.rawDevice.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: this.rawDevice.createShaderModule({
                    code: shaderSource,
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
                module: this.rawDevice.createShaderModule({
                    code: shaderSource,
                }),
                entryPoint: 'mainFragment',
                targets: [
                    {
                        format: this.format,
                    },
                ],
            },
            primitive: {
                topology: 'triangle-list',
                cullMode: 'back',
            }
        });
    }

    createBuffer(descriptor: { size: number; usage: number; }): GPUBuffer {
        return this.rawDevice.createBuffer(descriptor)
    }

    createCommandEncoder(): GPUCommandEncoder {
        throw new Error("Method not implemented.");
    }

    createBindGroup(descriptor: { layout: any; entries: { binding: number; resource: { buffer: any; }; }[]; }): GPUBindGroup {
        return this.rawDevice.createBindGroup(descriptor)
    }

    writeBuffer(buffer: GPUBuffer, bufferOffset: number, data: BufferSource | SharedArrayBuffer, dataOffset?: number | undefined, size?: number | undefined) {
        this.rawDevice.queue.writeBuffer(buffer, bufferOffset, data, dataOffset, size)
    }

    submit(commandBuffers: GPUCommandBuffer[]) {
        this.rawDevice.queue.submit(commandBuffers)
    }
}