import { ComponentType, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData } from '../../state/store'
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection } from "../components/collection"
import { Vector3 } from "../../domain/vector/vector3"
import { Canvas } from "../components/canvas"

export const UnlitShaderNode: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [colorVector3, setColorVector3] = useState(new Vector3(0, 0, 0) as IValueType)
    

    const setInput = (value: IValueType) => { setColorVector3(value) }
    return (
        <Card data-bs-theme={'dark'} >
            <Card.Header>Unlit Shader</Card.Header>
            <Card.Body>
                <InputCollection top={70} nodeId={id} elements={[
                    { title: 'Color', type: ValueType.Vector3, hideHandle: false, onChange: setInput },
                ]} />
                <Canvas  />
            </Card.Body>
        </Card>
    );
};
