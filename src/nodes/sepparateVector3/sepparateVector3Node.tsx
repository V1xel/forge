import { ComponentType, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData } from '../../state/store'
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection, OutputCollection } from "../components/collection"
import { Vector3 } from "../../domain/vector/vector3"
import { SepparateVector3 } from "../../domain/vector/sepparateVector3"

export const CombineVector3Node: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [vector3, setVector3] = useState(new Vector3(0, 0, 0) as IValueType)
    const sepparate = new SepparateVector3(vector3)
    const result = sepparate.getResult();

    const setInputVector3 = (value: IValueType) => { setVector3(value) }
    return (
        <Card data-bs-theme={'dark'} className="scalar-node">
            <Card.Header className="scalar-node-header">Sepparate Vector3</Card.Header>
            <Card.Body>
                <OutputCollection nodeId={id} elements={[
                    { type: ValueType.Scalar, result: result.x },
                    { type: ValueType.Scalar, result: result.y },
                    { type: ValueType.Scalar, result: result.z },
                ]} />
                <InputCollection nodeId={id} elements={[
                    { type: ValueType.Vector3, hideHandle: false, onChange: setInputVector3 },
                ]} />
            </Card.Body>
        </Card>
    );
};
