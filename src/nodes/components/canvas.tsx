import { useEffect } from "react"
import { WebGPUEngine } from '../../webGPU/engine'
import { IDataType } from "../../domain/dataType"
import { Geometry } from "../../domain/geometry"
import { WebGPUCanvas, WebGPUDevice } from "../../webGPU/canvas"
import { Vector3 } from "../../domain/vector/vector3"

export interface ICanvasProps {
    nodeId: string,
    geometry: IDataType
    color: IDataType,
    shader: string
}

const MakeCanvasId = (nodeId: string) => `canvas-nodeId:${nodeId}`

export const Canvas = ({ nodeId, geometry, color, shader }: ICanvasProps) => {
    useEffect(() => {
        const canvas = WebGPUCanvas.getCanvas(MakeCanvasId(nodeId))
        const engine = new WebGPUEngine(WebGPUDevice.device, WebGPUDevice.format, geometry as Geometry)
        const frame = engine.init(shader, (color as Vector3).getVector3().getValue())
        engine.bindContext(canvas)
        
        const animationFrameId = frame()
        return () => cancelAnimationFrame(animationFrameId)
    }, [nodeId, geometry, color])

    return <canvas id={MakeCanvasId(nodeId)} height={280} width={280}></canvas>
}
