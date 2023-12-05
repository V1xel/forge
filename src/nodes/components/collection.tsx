import { DataType, IDataType } from "../../domain/dataType"
import { IValueType, ValueType } from "../../domain/valueType"
import { Input } from "./input"
import { Output } from "./output"

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

interface OutputCollectionProps {
    nodeId: string,
    elements: { type: (DataType | ValueType), result: IDataType, title: string }[]
}

export const OutputCollection = ({ elements, nodeId }: OutputCollectionProps) => {
    const outputs = []
    for (let index = 0; index < elements.length; index++) {
        const { type, result, title } = elements[index]
        outputs.push(<Output key={index} outputId={index} title={title} nodeId={nodeId} result={result} type={type} />)
    }

    return outputs
}
