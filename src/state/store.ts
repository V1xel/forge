import { create } from 'zustand';
import {
    Connection,
    Node as ReactFlowNode,
    ReactFlowProps,
    addEdge
} from 'reactflow';

export type NodeData = {

}

export type Node = ReactFlowNode & {
    data: NodeData
}

export type Store = ReactFlowProps & {
    nodes: Node[]
};

const storeFields = {
    nodes: [
        { id: '1', position: { x: 200, y: 200 }, data: {} },
        { id: '2', position: { x: 400, y: 200 }, data: {} },
    ],
    edges: [],
}

export const useStore = create<Store>((set, get) => ({
    ...storeFields,
    onConnect: (connection: Connection) => {
        const { edges } = get();
        if (!edges)
            return;

        set({
            edges: addEdge(connection, edges)
        });
    },
}));


