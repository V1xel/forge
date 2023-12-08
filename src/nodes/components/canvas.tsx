import { useEffect } from "react"
import { IDataType } from "../../domain/dataType"
import { WebGPUCanvas } from "../../webGPU2/wrappers/canvas"
import { WebGPUEngine } from "../../webGPU2/engine"
import { Matrix4 } from "../../domain/matrix/matrix4"
import { Geometry } from "../../domain/geometry"
import { Vector3 } from "../../domain/vector/vector3"

export interface ICanvasProps {
    nodeId: string,
    geometry: IDataType,
    color: IDataType,
    shader: string,
    transform: IDataType,
}

const MakeCanvasId = (nodeId: string) => `canvas-nodeId:${nodeId}`

export const Canvas = ({ nodeId, geometry, color, shader, transform }: ICanvasProps) => {
    useEffect(() => {
        const canvas = WebGPUCanvas.getCanvas(MakeCanvasId(nodeId))
        const engine = new WebGPUEngine(canvas)
        engine.initialize(geometry as Geometry, shader, { color: color as Vector3, transform: transform as Matrix4 })

        return engine.loop()
    }, [nodeId, geometry, color])

    return <canvas id={MakeCanvasId(nodeId)} height={280} width={280}></canvas>
}
