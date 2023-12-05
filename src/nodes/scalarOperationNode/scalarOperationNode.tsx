import { ComponentType, useEffect, useState } from "react"
import { Card, Form } from "react-bootstrap"
import { NodeData, useStore } from '../../state/store'
import { Scalar } from "../../domain/scalar/scalar"
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { Output } from "../components/output"
import { InputCollection } from "../components/collection"
import { ScalarOperation, ScalarOperationType } from "../../domain/scalar/scalarOperation"
import { Select } from "../components/select"

export const ScalarOperationNode: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [scalarA, setScalarA] = useState(new Scalar(0) as IValueType)
    const [scalarB, setScalarB] = useState(new Scalar(0) as IValueType)
    const [type, setType] = useState(ScalarOperationType.Add)
    const scalarOperation = new ScalarOperation(scalarA, scalarB, type)
    const { onNodeResult } = useStore()

    useEffect(() => { onNodeResult({ nodeId: id, data: scalarOperation.getResult() }) }, [scalarA, scalarB, type, onNodeResult])

    const setInputA = (value: IValueType) => { setScalarA(value) }
    const setInputB = (value: IValueType) => { setScalarB(value) }
    const setMode = (value: string) => { setType(value as ScalarOperationType) }

    return (
        <Card data-bs-theme={'dark'} className="scalar-node">
            <Card.Header className="scalar-node-header">Scalar Operation</Card.Header>
            <Card.Body>
                <Output nodeId={id} type={ValueType.Scalar} />
                <Select onChange={setMode} enumType={ScalarOperationType} />
                <InputCollection nodeId={id} elements={[
                    { type: ValueType.Scalar, hideHandle: false, onChange: setInputA },
                    { type: ValueType.Scalar, hideHandle: false, onChange: setInputB }
                ]} />
            </Card.Body>
        </Card>
    )
}
