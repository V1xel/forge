export class RenderPipeline {
    public static create(device: GPUDevice, format: GPUTextureFormat, shader: string) {
        return device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: device.createShaderModule({
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
                module: device.createShaderModule({
                    code: shader,
                }),
                entryPoint: 'mainFragment',
                targets: [
                    {
                        format: format,
                    },
                ],
            },
            primitive: {
                topology: 'triangle-list',
                cullMode: 'back',
            },
            depthStencil: {
                depthWriteEnabled: true,
                depthCompare: 'less',
                format: 'depth24plus',
            },
        });
    }
}