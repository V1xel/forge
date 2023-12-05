import { ComponentType, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData, useStore } from '../../state/store'
import { Scalar } from "../../domain/scalar/scalar"
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { Output } from "../components/output"
import { InputCollection } from "../components/collection"

export const ScalarNode: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [scalar, setScalar] = useState(new Scalar(0) as IValueType)
    const { onNodeResult } = useStore()

    useEffect(() => { onNodeResult({ nodeId: id, data: scalar }) }, [scalar, onNodeResult])

    const setInput = (value: IValueType) => { setScalar(value) }
    return (
        <Card data-bs-theme={'dark'} className="scalar-node">
            <Card.Header className="scalar-node-header">Scalar</Card.Header>
            <Card.Body>
                <Output nodeId={id} type={ValueType.Scalar} />
                <InputCollection nodeId={id} elements={[
                    { type: ValueType.Scalar, hideHandle: true, onChange: setInput }
                ]} />
            </Card.Body>
        </Card>
    );
};
