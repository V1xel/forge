import { ComponentType, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData } from '../../state/store'
import { Scalar } from "../../domain/scalar/scalar"
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection, OutputCollection } from "../components/collection"
import './scalarNode.css'

export const ScalarNode: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [scalar, setScalar] = useState(new Scalar(0) as IValueType)

    const setInput = (value: IValueType) => { setScalar(value) }
    return (
        <Card data-bs-theme={'dark'} className="scalar-node">
            <Card.Header className="scalar-node-header">Scalar</Card.Header>
            <Card.Body>
                <OutputCollection
                    nodeId={id}
                    elements={[
                        { title: 'Value', type: ValueType.Scalar, result: scalar },
                    ]}
                />
                <InputCollection nodeId={id} elements={[
                    { type: ValueType.Scalar, hideHandle: true, onChange: setInput }
                ]} />
            </Card.Body>
        </Card>
    );
};
