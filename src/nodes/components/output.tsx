import { Card } from "react-bootstrap"
import { Handle, Position } from "reactflow"
import { Dictionary } from "../../utilities/types";
import { DataType } from "../../domain/dataType";
import { ValueType } from "../../domain/valueType";
import { useEffect } from "react";

const handleStyleMap = {
    [ValueType.Vector3]: 'vector3-handle',
    [ValueType.Scalar]: 'scalar-handle',
    [DataType.Geometry]: '',
    [DataType.ValueType]: '',
}

const nodeOutputsCounters: Dictionary<number> = {}
const incrementOutputCounter = (nodeId: string) => {
    if (!nodeOutputsCounters[nodeId]) {
        nodeOutputsCounters[nodeId] = 1;
    } else {
        nodeOutputsCounters[nodeId]
    }
}

interface OutputProps {
    nodeId: string,
    type: DataType | ValueType
}
export const Output = ({ nodeId, type }: OutputProps) => {
    useEffect(() => incrementOutputCounter(nodeId), [nodeId])

    return (
        <>
            <Card.Text className="text-end">Value</Card.Text>
            <Handle id={`nodeId:${nodeId}-handleId:${nodeOutputsCounters[nodeId]}`} className={handleStyleMap[type]} position={Position.Right} type="source"  />
        </>
    )
}
