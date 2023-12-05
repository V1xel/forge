import { Form } from "react-bootstrap"
import { Handle, Position } from "reactflow"
import { IValueType, ValueType } from "../../domain/valueType"
import { DataType } from "../../domain/dataType"
import { Node, useStore } from "../../state/store"
import { Scalar } from "../../domain/scalar/scalar"
import { useEffect } from "react"

const handleStyleMap = {
    [ValueType.Vector3]: 'vector3-handle',
    [ValueType.Scalar]: 'scalar-handle',
    [DataType.Geometry]: '',
    [DataType.ValueType]: '',
}

interface InputProps {
    nodeId: string,
    type: DataType | ValueType,
    onChange: (value: IValueType) => void
    inputId: number,
    hideHandle: boolean
}

export const Input = ({ inputId, nodeId, hideHandle, type, onChange }: InputProps) => {
    const attachedNodeValue = useStore(store => {
        const nodeData = store.nodes.find(node => node.id === nodeId) as Node
        const attachedInputNodeId = nodeData.data.sourceNodes[`nodeId:${nodeId}-inputId:${inputId}`]
        return store.nodeResults[attachedInputNodeId]
    })

    useEffect(() => {
        if (attachedNodeValue !== undefined)
            onChange(attachedNodeValue.get<IValueType>())
    }, [attachedNodeValue])

    return (
        <>
            <Form.Control onChange={(e) => onChange(new Scalar(e.target.value))} type="number" className="text-center" />
            <Handle hidden={hideHandle} id={`nodeId:${nodeId}-inputId:${inputId}`} style={{ top: 115 + inputId * 38 }} className={handleStyleMap[type]} position={Position.Left} type="target" />
        </>
    )
}