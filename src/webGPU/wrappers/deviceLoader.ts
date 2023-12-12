import { WebGPUDevice } from "./device"
import girafe from '/Cube.png'

let _deviceWrapper: WebGPUDevice
let bitmap: ImageBitmap

export class WebGPUDeviceLoader {
    public static async loadDevice(): Promise<void> {
        const adapter = await navigator.gpu.requestAdapter()
        const imageElement = new Image() as HTMLImageElement;
        await new Promise((resolve, reject) => {
            imageElement.onload = () => resolve(imageElement);
            imageElement.onerror = reject;
            imageElement.src = girafe;
        });

        bitmap = await createImageBitmap(imageElement)
        const format = navigator.gpu.getPreferredCanvasFormat()

        if (!adapter)
            throw new Error()
        const device = await adapter.requestDevice()
        if (!device) {
            throw new Error()
        }

        _deviceWrapper = new WebGPUDevice(device, format)
    }

    public static get image(): ImageBitmap {
        return bitmap
    }

    public static get instance(): WebGPUDevice {
        if (!_deviceWrapper) {
            throw new Error('WebGPUDeviceLoader is not initialized')
        }
        return _deviceWrapper
    }
}
