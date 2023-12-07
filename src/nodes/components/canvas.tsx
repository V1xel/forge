import { useEffect } from "react"
import { Geometry } from "../../domain/geometry"
import { WebGPUCanvas, WebGPUDevice } from "../../webGPU/canvas"

export interface ICanvasProps {
    nodeId: string,
    geometry: Geometry | null
}

const MakeCanvasId = (nodeId: string) => `canvas-nodeId:${nodeId}`

export const Canvas = ({ nodeId, geometry }: ICanvasProps) => {
    useEffect(() => {
        const canvas = WebGPUCanvas.getCanvas(MakeCanvasId(nodeId))
        const device = WebGPUDevice.getDevice()

        console.log(device)
    }, [nodeId])

    return <canvas id={MakeCanvasId(nodeId)} height={280} width={280}></canvas>
}
