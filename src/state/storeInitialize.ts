import { ScalarNode } from "../nodes/scalarNode/scalarNode"
import { StoreFields } from "./store"

export const initialFields: StoreFields = {
    nodeTypes: {
        scalar: ScalarNode
    },
    nodes: [
        { id: '1', type: 'scalar', position: { x: 200, y: 200 }, data: {} },
        { id: '2', type: 'scalar', position: { x: 600, y: 200 }, data: {} }
    ],
    edges: [],
    nodeResults: {}
}
