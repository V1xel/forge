import { ComponentType, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData } from '../../state/store'
import { Scalar } from "../../domain/scalar/scalar"
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection, OutputCollection } from "../components/collection"
import { ScalarOperation, ScalarOperationType } from "../../domain/scalar/scalarOperation"
import { Select } from "../components/select"
import './scalarOperationNode.css'

export const ScalarOperationNode: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [scalarA, setScalarA] = useState(new Scalar(0) as IValueType)
    const [scalarB, setScalarB] = useState(new Scalar(0) as IValueType)
    const [type, setType] = useState(ScalarOperationType.Add)
    const [result, setResult] = useState(new Scalar(0) as IValueType)

    const scalarOperation = new ScalarOperation(scalarA, scalarB, type)
    useEffect(() => { setResult(scalarOperation.getResult()) }, [scalarA, scalarB, type])

    const setInputA = (value: IValueType) => { setScalarA(value) }
    const setInputB = (value: IValueType) => { setScalarB(value) }
    const setOperationType = (value: string) => { setType(value as ScalarOperationType) }

    return (
        <Card data-bs-theme={'dark'} className="scalar-operation-node">
            <Card.Header className="scalar-operation-header">Scalar Operation</Card.Header>
            <Card.Body>
                <OutputCollection
                    nodeId={id}
                    elements={[
                        { title: 'Result', type: ValueType.Scalar, result: result },
                    ]}
                />
                <Select onChange={setOperationType} enumType={ScalarOperationType} />
                <InputCollection top={157} nodeId={id} elements={[
                    { title:'s', type: ValueType.Scalar, hideHandle: false, onChange: setInputA },
                    { title:'s', type: ValueType.Scalar, hideHandle: false, onChange: setInputB }
                ]} />
            </Card.Body>
        </Card>
    )
}
