import { ScalarNode } from "../nodes/scalarNode/scalarNode"
import { ScalarOperationNode } from "../nodes/scalarOperationNode/scalarOperationNode"
import { StoreFields } from "./store"

export const initialFields: StoreFields = {
    nodeTypes: {
        scalar: ScalarNode,
        scalarOperation: ScalarOperationNode,
    },
    nodes: [
        { id: '1', type: 'scalar', position: { x: 200, y: 200 }, data: { sourceNodes: {} } },
        { id: '2', type: 'scalar', position: { x: 200, y: 380 }, data: { sourceNodes: {}} },
        { id: '3', type: 'scalarOperation', position: { x: 550, y: 200 }, data: { sourceNodes: {}} }
    ],
    edges: [],
    nodeResults: {}
}
