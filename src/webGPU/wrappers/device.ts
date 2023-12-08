export class WebGPUDevice {
    copyExternalImageToTexture(source: GPUImageCopyExternalImage, destination: GPUImageCopyTextureTagged, copySize: GPUExtent3DStrict) {
        return this.rawDevice.queue.copyExternalImageToTexture(source, destination, copySize)
    }
    createTexture(descriptor: GPUTextureDescriptor) {
        return this.rawDevice.createTexture(descriptor)
    }
    constructor(public rawDevice: GPUDevice, public format: GPUTextureFormat) { }

    createRenderPipeline(shaderSource: string) {
        const pipelineLayout = this.rawDevice.createPipelineLayout({
            bindGroupLayouts: [
                this.rawDevice.createBindGroupLayout({
                    entries: [
                        {
                            binding: 0,
                            visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                            buffer: { type: 'uniform' }, // Use buffer field for uniform
                        },
                        // Binding 1: Sampler
                        {
                            binding: 1,
                            visibility: GPUShaderStage.FRAGMENT,
                            sampler: {}, // Use sampler field for sampler
                        },
                        // Binding 2: Texture
                        {
                            binding: 2,
                            visibility: GPUShaderStage.FRAGMENT,
                            texture: { sampleType: 'float', viewDimension: '2d', multisampled: false }, // Use texture field for texture
                        },
                    ],
                })
            ],
        });

        return this.rawDevice.createRenderPipeline({
            layout: pipelineLayout,
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
        return this.rawDevice.createCommandEncoder()
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

    createSampler(descriptor: GPUSamplerDescriptor) {
        return this.rawDevice.createSampler(descriptor)
    }
}