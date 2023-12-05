import { Form } from "react-bootstrap"
import { Handle, Position } from "reactflow"
import { ValueType } from "../../domain/valueType"
import { DataType } from "../../domain/dataType"

const handleStyleMap = {
    [ValueType.Vector3]: 'vector3-handle',
    [ValueType.Scalar]: 'scalar-handle',
    [DataType.Geometry]: '',
    [DataType.ValueType]: '',
}

interface InputProps {
    nodeId: string,
    type: DataType | ValueType,
    onChange: (value: number) => void
    inputId: number,
    hideHandle: boolean
}

export const Input = ({ inputId, nodeId, hideHandle, type, onChange }: InputProps) => {
    return (
        <>
            <Form.Control onChange={(e) => onChange(Number(e.target.value))} type="number" className="text-center" />
            <Handle hidden={hideHandle} id={`nodeId:${nodeId}-inputId:${inputId}`} style={{ top: 115 + inputId * 38 }} className={handleStyleMap[type]} position={Position.Left} type="target" />
        </>
    )
}