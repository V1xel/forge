import { create } from 'zustand'
import { Connection, Node as ReactFlowNode, ReactFlowProps } from 'reactflow'
import { initialFields } from './storeInitialize'
import { Result, StoreHelper } from './storeHelper'
import { Data } from '../domain/dataType'
import { Dictionary } from '../utilities/types'

export type NodeData = {
    sourceNodes: Dictionary<string>
}

export type Node = ReactFlowNode<NodeData>

export type StoreFields = ReactFlowProps & {
    nodes: Node[],
    nodeResults: Dictionary<Data>,
};

type StoreMethods = {
    onNodeResult: (result: Result) => void
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
    onNodeResult: (result: Result) => {
        const { nodeResults } = get()
        if (!nodeResults)
            return

        set({
            nodeResults: StoreHelper.addResult(result, nodeResults)
        })

        console.log(get().nodeResults)
    }
}));
