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
    outputId: number,
    title: string,
    result: IDataType,
}
export const Output = ({ nodeId, outputId, type, title, result }: OutputProps) => {
    const { onNodeOutput } = useStore()

    useEffect(() => {
        onNodeOutput({ nodeId, outputId: outputId.toString(), data: result })
    }, [nodeId, outputId, result])

    return (
        <>
            <Card.Text className="text-end">{title}</Card.Text>
            <Handle id={`nodeId:${nodeId}-outputId:${outputId}`} style={{ top: 70 + outputId * 39 }} className={handleStyleMap[type]} position={Position.Right} type="source" />
        </>
    )
}
