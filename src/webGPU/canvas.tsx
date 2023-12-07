export class WebGPUCanvas {
    private _canvas!: HTMLCanvasElement
    private _context!: GPUCanvasContext
    public static getCanvas(canvasId: string): WebGPUCanvas {
        return new WebGPUCanvas(canvasId)
    }

    constructor(canvasId: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement | undefined
        if (!canvas)
            throw new Error(`Failed to get canvas with id: ${canvasId}`)
        this._canvas = canvas

        const context = this._canvas.getContext('webgpu')
        if (!context)
            throw new Error(`Failed to get context of canvas with id: ${canvasId}`)
        this._context = context
    }

    public getContext(): GPUCanvasContext {
        return this._context;
    }

    public createView(): GPUTextureView {
        return this._context.getCurrentTexture().createView()
    }
}

let _adapter: GPUAdapter
let _device: GPUDevice

export class WebGPUDevice {
    public static async loadDevice(): Promise<WebGPUDevice> {
        const adapter = await navigator.gpu.requestAdapter()

        if (!adapter)
            throw new Error()
        _adapter = adapter
        const device = await adapter.requestDevice()
        if (!device) {
            throw new Error()
        }
        _device = device

        return _device
    }

    public static getDevice(): GPUDevice {
        return _device
    }
}