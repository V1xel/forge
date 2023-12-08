import { ComponentType, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData } from '../../state/store'
import { ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection, OutputCollection } from "../components/collection"
import { Vector3 } from "../../domain/vector/vector3"
import { SeparateVector3 } from "../../domain/vector/separateVector3"
import './separateVector3Node.css'
import { IDataType } from "../../domain/dataType"

export const SeparateVector3Node: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [vector3, setVector3] = useState(new Vector3(0, 0, 0) as IDataType)
    const sepparate = new SeparateVector3(vector3)
    const result = sepparate.getResult();

    const setInputVector3 = (value: IDataType) => { setVector3(value) }
    return (
        <Card data-bs-theme={'dark'} className="separate-vector3-node">
            <Card.Header className="separate-vector3-node-header">Separate Vector3</Card.Header>
            <Card.Body>
                <OutputCollection nodeId={id} elements={[
                    { title: 'x', type: ValueType.Scalar, result: result.x },
                    { title: 'y', type: ValueType.Scalar, result: result.y },
                    { title: 'z', type: ValueType.Scalar, result: result.z },
                ]} />
                <InputCollection top={190} nodeId={id} elements={[
                    { title: 'Vector', type: ValueType.Vector3, hideHandle: false, onChange: setInputVector3 },
                ]} />
            </Card.Body>
        </Card>
    );
};
