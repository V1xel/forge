import { ComponentType, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData, useStore } from '../../state/store'
import { Scalar } from "../../domain/scalar/scalar"
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection, OutputCollection } from "../components/collection"
import { CombineVector3 } from "../../domain/vector/combineVector3"

export const CombineVector3Node: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [x, setX] = useState(new Scalar(0) as IValueType)
    const [y, setY] = useState(new Scalar(0) as IValueType)
    const [z, setZ] = useState(new Scalar(0) as IValueType)
    const combine = new CombineVector3(x, y, z)

    const setInputX = (value: IValueType) => { setX(value) }
    const setInputY = (value: IValueType) => { setY(value) }
    const setInputZ = (value: IValueType) => { setZ(value) }
    return (
        <Card data-bs-theme={'dark'} className="scalar-node">
            <Card.Header className="scalar-node-header">Combine Vector3</Card.Header>
            <Card.Body>
                <OutputCollection
                    nodeId={id}
                    elements={[
                        { title: 'Result', type: ValueType.Scalar, result: combine.getResult() },
                    ]}
                />
                <InputCollection nodeId={id} elements={[
                    { type: ValueType.Scalar, hideHandle: false, onChange: setInputX },
                    { type: ValueType.Scalar, hideHandle: false, onChange: setInputY },
                    { type: ValueType.Scalar, hideHandle: false, onChange: setInputZ }
                ]} />
            </Card.Body>
        </Card>
    );
};
