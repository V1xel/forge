import { ComponentType, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData } from '../../state/store'
import { IValueType, ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection } from "../components/collection"
import { Vector3 } from "../../domain/vector/vector3"
import { Canvas } from "../components/canvas"
import { IDataType } from "../../domain/dataType"
import plane from '/plane.obj'
import { Geometry } from "../../domain/geometry"

export const UnlitShaderNode: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const [colorVector3, setColorVector3] = useState(new Vector3(0, 0, 0) as IValueType)
    const [geometry, setGeometry] = useState(new Geometry as IDataType | null)

    useEffect(() => {

    },[])

    const setInput = (value: IValueType) => { setColorVector3(value) }
    const setInputGeometry = (value: IValueType) => { setGeometry(value) }
    return (
        <Card data-bs-theme={'dark'} >
            <Card.Header>Unlit Shader</Card.Header>
            <Card.Body>
                <InputCollection top={70} nodeId={id} elements={[
                    { title: 'Color', type: ValueType.Vector3, hideHandle: false, onChange: setInput },
                ]} />
                <Canvas geometry={geometry} nodeId={id}  />
            </Card.Body>
        </Card>
    );
};
