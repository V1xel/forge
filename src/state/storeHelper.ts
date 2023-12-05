import { Connection, Edge, addEdge } from "reactflow";
import { Data, IDataType } from "../domain/dataType";
import { Dictionary } from "../utilities/types";
import { Node } from "./store";

export type Result = { nodeId: string, data: IDataType };

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
                    ...node.data, sourceNodes: {
                        ...node.data.sourceNodes, [targetHandle]: source
                    }
                };
            }

            return node;
        })
    }

    public static addResult(result: Result, nodeResults: Dictionary<Data>): Dictionary<Data> {
        return { ...nodeResults, [result.nodeId]: new Data(result.data) }
    }
}