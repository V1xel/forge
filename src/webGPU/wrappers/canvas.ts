import { WebGPUDevice } from "./device"

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

    public bindContext(device: WebGPUDevice): void {
        this._context.configure({
            device: device.rawDevice,
            format: device.format,
            alphaMode: 'premultiplied'
        })
    }

    public createView(): GPUTextureView {
        return this._context.getCurrentTexture().createView()
    }
}
