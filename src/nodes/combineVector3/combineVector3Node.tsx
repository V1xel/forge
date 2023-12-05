import { ComponentType, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData, useStore } from '../../state/store'
import { Scalar } from "../../domain/scalar/scalar"
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { Output } from "../components/output"
import { InputCollection } from "../components/collection"
import { CombineVector3 } from "../../domain/vector/combineVector3"

export const CombineVector3Node: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [x, setX] = useState(new Scalar(0) as IValueType)
    const [y, setY] = useState(new Scalar(0) as IValueType)
    const [z, setZ] = useState(new Scalar(0) as IValueType)
    const combine = new CombineVector3(x, y, z)
    const { onNodeResult } = useStore()

    useEffect(() => { onNodeResult({ nodeId: id, data: combine.getResult() }) }, [x, y, z, onNodeResult])

    const setInputX = (value: IValueType) => { setX(value) }
    const setInputY = (value: IValueType) => { setY(value) }
    const setInputZ = (value: IValueType) => { setZ(value) }
    return (
        <Card data-bs-theme={'dark'} className="scalar-node">
            <Card.Header className="scalar-node-header">Scalar</Card.Header>
            <Card.Body>
                <Output nodeId={id} type={ValueType.Scalar} />
                <InputCollection nodeId={id} elements={[
                    { type: ValueType.Scalar, hideHandle: true, onChange: setInputX },
                    { type: ValueType.Scalar, hideHandle: true, onChange: setInputY },
                    { type: ValueType.Scalar, hideHandle: true, onChange: setInputZ }
                ]} />
            </Card.Body>
        </Card>
    );
};
