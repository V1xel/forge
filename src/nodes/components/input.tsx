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

const MakeInputId = (nodeId: string, inputId: number) => `nodeId:${nodeId}-inputId:${inputId}`

export const Input = ({ inputId, nodeId, hideHandle, type, onChange }: InputProps) => {
    const attachedNodeValue = useStore(store => {
        const nodeData = store.nodes.find(node => node.id === nodeId) as Node
        const attachedOutputNodeId = nodeData.data.inputNodes[MakeInputId(nodeId, inputId)]
        return store.nodeOutputs[attachedOutputNodeId]
    })

    useEffect(() => {
        if (attachedNodeValue !== undefined)
            onChange(attachedNodeValue.get<IValueType>())
    }, [attachedNodeValue])

    return (
        <>
            <Form.Control onChange={(e) => onChange(new Scalar(e.target.value))} type="number" className="text-center" />
            <Handle hidden={hideHandle} id={MakeInputId(nodeId, inputId)} style={{ top: 115 + inputId * 38 }} className={handleStyleMap[type]} position={Position.Left} type="target" />
        </>
    )
}