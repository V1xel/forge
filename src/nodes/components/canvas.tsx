import { Geometry } from "../../domain/geometry"

export interface ICanvasProps {
    nodeId: string,
    geometry: Geometry | null
}

const MakeCanvasId = (nodeId: string) => `canvas-nodeId:${nodeId}`

export const Canvas = ({ nodeId, geometry }: ICanvasProps) => {
    

    return <canvas id={MakeCanvasId(nodeId)} height={280} width={280}></canvas>
}
