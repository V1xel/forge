import { DataType } from "../../domain/dataType"
import { IValueType, ValueType } from "../../domain/valueType"
import { Input } from "./input"

interface InputCollectionProps {
    nodeId: string,
    elements: { type: (DataType | ValueType), hideHandle: boolean, onChange: (value: IValueType) => void }[]
}

export const InputCollection = ({ elements, nodeId }: InputCollectionProps) => {
    const inputs = []
    for (let index = 0; index < elements.length; index++) {
        const { type, onChange, hideHandle } = elements[index]
        inputs.push(<Input key={index} hideHandle={hideHandle} inputId={index} nodeId={nodeId} onChange={(value) => onChange(value)} type={type} />)
    }

    return inputs
}
