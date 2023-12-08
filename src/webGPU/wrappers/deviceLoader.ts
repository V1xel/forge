import { WebGPUDevice } from "./device"

let _deviceWrapper: WebGPUDevice

export class WebGPUDeviceLoader {
    public static async loadDevice(): Promise<void> {
        const adapter = await navigator.gpu.requestAdapter()
        const format = navigator.gpu.getPreferredCanvasFormat()

        if (!adapter)
            throw new Error()
        const device = await adapter.requestDevice()
        if (!device) {
            throw new Error()
        }

        _deviceWrapper = new WebGPUDevice(device, format)
    }

    public static get instance(): WebGPUDevice {
        if(!_deviceWrapper){
            throw new Error('WebGPUDeviceLoader is not initialized')
        }
        return _deviceWrapper
    }
}
