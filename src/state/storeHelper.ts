import { Connection, Edge, addEdge } from "reactflow";
import { Data, IDataType } from "../domain/dataType";
import { Dictionary } from "../utilities/types";
import { Node } from "./store";

export type Output = { nodeId: string, outputId: string, data: IDataType };

export class StoreHelper {
    public static addEdge(connection: Connection, edges: Edge[]): Edge[] {
        return addEdge(connection, edges);
    }

    public static updateNodeDataSourceNodes(connection: Connection, nodes: Node[]): Node[] {
        const { targetHandle, sourceHandle, source } = connection
        if (!targetHandle || !sourceHandle || !source)
            return nodes;

        return nodes.map(node => {
            if (node.id === connection.target) {
                node.data = {
                    ...node.data, inputNodes: {
                        ...node.data.inputNodes, [targetHandle]: sourceHandle
                    }
                };
            }

            return node;
        })
    }

    public static addResult(output: Output, nodeOutputs: Dictionary<Data>): Dictionary<Data> {
        return { ...nodeOutputs, [`nodeId:${output.nodeId}-outputId:${output.outputId}`]: new Data(output.data) }
    }
}