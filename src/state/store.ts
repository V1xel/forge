import { create } from 'zustand';
import {
    Node as ReactFlowNode,
    ReactFlowProps
} from 'reactflow';

type Node = ReactFlowNode & {}

type Store = ReactFlowProps & {};

export const useStore = create<Store>((set, get) => ({
    
}));

export const useFlowStore = () => useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    nodeTypes: state.nodeTypes,
}))
