import { ComponentType, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData } from '../../state/store'
import { Scalar } from "../../domain/scalar/scalar"
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection, OutputCollection } from "../components/collection"
import { Select } from "../components/select"
import { Vector3Operation, Vector3OperationType } from "../../domain/vector/vectorOperation"
import './vector3OperationNode.css'

export const Vector3OperationNode: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [vector3A, setVector3A] = useState(new Scalar(0) as IValueType)
    const [vector3B, setVector3B] = useState(new Scalar(0) as IValueType)
    const [type, setType] = useState(Vector3OperationType.Add)
    const [result, setResult] = useState(new Scalar(0) as IValueType)

    const vector3Operation = new Vector3Operation(vector3A, vector3B, type)
    useEffect(() => { setResult(vector3Operation.getResult()) }, [vector3A, vector3B, type])

    const setInputA = (value: IValueType) => { setVector3A(value) }
    const setInputB = (value: IValueType) => { setVector3B(value) }
    const setOperationType = (value: string) => { setType(value as Vector3OperationType) }

    return (
        <Card data-bs-theme={'dark'} className="vector3-operation-node">
            <Card.Header className="vector3-operation-header">Vector3 Operation</Card.Header>
            <Card.Body>
                <OutputCollection
                    nodeId={id}
                    elements={[
                        { title: 'Result', type: ValueType.Scalar, result: result },
                    ]}
                />
                <Select onChange={setOperationType} enumType={Vector3OperationType} />
                <InputCollection top={152} nodeId={id} elements={[
                    { title: 'Vector', type: ValueType.Vector3, hideHandle: false, onChange: setInputA },
                    { title: 'Vector', type: ValueType.Vector3, hideHandle: false, onChange: setInputB }
                ]} />
            </Card.Body>
        </Card>
    )
}
