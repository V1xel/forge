import { CombineVector3Node } from "../nodes/combineVector3/combineVector3Node"
import { ScalarNode } from "../nodes/scalarNode/scalarNode"
import { ScalarOperationNode } from "../nodes/scalarOperationNode/scalarOperationNode"
import { StoreFields } from "./store"

export const initialFields: StoreFields = {
    nodeTypes: {
        scalar: ScalarNode,
        scalarOperation: ScalarOperationNode,
        combineVector3: CombineVector3Node,
    },
    nodes: [
        { id: '1', type: 'scalar', position: { x: 200, y: 200 }, data: { sourceNodes: {} } },
        { id: '2', type: 'scalar', position: { x: 200, y: 380 }, data: { sourceNodes: {}} },
        { id: '3', type: 'combineVector3', position: { x: 200, y: 560 }, data: { sourceNodes: {}} },
        { id: '4', type: 'scalarOperation', position: { x: 550, y: 200 }, data: { sourceNodes: {}} }
    ],
    edges: [],
    nodeResults: {}
}
