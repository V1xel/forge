import { create } from 'zustand'
import { Connection, Node as ReactFlowNode, ReactFlowProps } from 'reactflow'
import { initialFields } from './storeInitialize'
import { Output, StoreHelper } from './storeHelper'
import { Data } from '../domain/dataType'
import { Dictionary } from '../utilities/types'

export type NodeData = {
    inputNodes: Dictionary<string>
}

export type Node = ReactFlowNode<NodeData>

export type StoreFields = ReactFlowProps & {
    nodes: Node[],
    nodeOutputs: Dictionary<Data>,
};

type StoreMethods = {
    onNodeOutput: (result: Output) => void
}

type Store = StoreMethods & StoreFields
export const useStore = create<Store>((set, get) => ({
    ...initialFields,
    onConnect: (connection: Connection) => {
        const { edges, nodes } = get()
        if (!edges || !nodes)
            return

        set({
            edges: StoreHelper.addEdge(connection, edges),
            nodes: StoreHelper.updateNodeDataSourceNodes(connection, nodes)
        });
    },
    onNodeOutput: (result: Output) => {
        const { nodeOutputs } = get()
        if (!nodeOutputs)
            return

        set({
            nodeOutputs: StoreHelper.addResult(result, nodeOutputs)
        })
    }
}));
