import { Card } from "react-bootstrap"
import { Handle, Position } from "reactflow"
import { DataType, IDataType } from "../../domain/dataType";
import { ValueType } from "../../domain/valueType";
import { useStore } from "../../state/store";
import { useEffect } from "react";

const handleStyleMap = {
    [ValueType.Vector3]: 'vector3-handle',
    [ValueType.Scalar]: 'scalar-handle',
    [DataType.Geometry]: '',
    [DataType.ValueType]: '',
}

interface OutputProps {
    nodeId: string,
    type: DataType | ValueType,
    outputId: string,
    result: IDataType,
}
export const Output = ({ nodeId, outputId, type, result }: OutputProps) => {
    const { onNodeOutput } = useStore()

    useEffect(() => {
        onNodeOutput({ nodeId, outputId, data: result })
    }, [nodeId, outputId, result])

    return (
        <>
            <Card.Text className="text-end">Value</Card.Text>
            <Handle id={`nodeId:${nodeId}-outputId:${outputId}`} className={handleStyleMap[type]} position={Position.Right} type="source" />
        </>
    )
}
