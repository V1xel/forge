import { Connection, Edge, addEdge } from "reactflow";
import { Data, IDataType } from "../domain/dataType";
import { Dictionary } from "../utilities/types";

export type Result = { nodeId: string, data: IDataType };

export class StoreHelper {
    public static addEdge(connection: Connection, edges: Edge[]): Edge[] {
        return addEdge(connection, edges);
    }

    public static addResult(result: Result, nodeResults: Dictionary<Data>): Dictionary<Data> {
        return { ...nodeResults, [result.nodeId]: new Data(result.data) }
    }
}