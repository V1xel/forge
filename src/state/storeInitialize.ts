import { CombineVector3Node } from "../nodes/combineVector3/combineVector3Node"
import { ScalarNode } from "../nodes/scalarNode/scalarNode"
import { ScalarOperationNode } from "../nodes/scalarOperation/scalarOperationNode"
import { SeparateVector3Node } from "../nodes/separateVector3/separateVector3Node"
import { Vector3OperationNode } from "../nodes/vector3Operation/vector3OperationNode"
import { StoreFields } from "./store"

export const initialFields: StoreFields = {
    nodeTypes: {
        scalar: ScalarNode,
        scalarOperation: ScalarOperationNode,
        combineVector3: CombineVector3Node,
        separateVector3: SeparateVector3Node,
        vector3Operation: Vector3OperationNode,
    },
    nodes: [
        { id: '1', type: 'scalar', position: { x: 200, y: 200 }, data: { inputNodes: {} } },
        { id: '2', type: 'scalar', position: { x: 200, y: 380 }, data: { inputNodes: {} } },
        { id: '3', type: 'combineVector3', position: { x: 200, y: 560 }, data: { inputNodes: {} } },
        { id: '4', type: 'separateVector3', position: { x: 200, y: 800 }, data: { inputNodes: {} } },
        { id: '5', type: 'vector3Operation', position: { x: 550, y: 800 }, data: { inputNodes: {} } },
        { id: '6', type: 'scalarOperation', position: { x: 550, y: 200 }, data: { inputNodes: {} } }
    ],
    edges: [],
    nodeOutputs: {}
}
