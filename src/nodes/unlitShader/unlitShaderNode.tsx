import { ComponentType, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { NodeData } from '../../state/store'
import { ValueType } from "../../domain/valueType"
import { NodeProps } from "reactflow"
import { InputCollection } from "../components/collection"
import { Vector3 } from "../../domain/vector/vector3"
import { Canvas } from "../components/canvas"
import { Geometry } from "../../domain/geometry"
import { ObjParser } from "../../utilities/objLoader"
import { IDataType } from "../../domain/dataType"
import plane from '../../../plane.obj?raw'
import unlit from '../../webGPU2/shaders/unlit.wgsl?raw'
import { Matrix4 } from "../../domain/matrix/matrix4"
import { Vector4 } from "../../domain/vector/vector4"

export const UnlitShaderNode: ComponentType<NodeProps<NodeData>> = ({ id }) => {
    const geometry = new Geometry(plane, ObjParser.Instance) as IDataType
    const [colorVector3, setColorVector3] = useState(new Vector3(0, 0, 0) as IDataType)

    const setInputColor = (value: IDataType) => { setColorVector3(value) }
    return (
        <Card data-bs-theme={'dark'} >
            <Card.Header>Unlit Shader</Card.Header>
            <Card.Body>
                <InputCollection top={70} nodeId={id} elements={[
                    { title: 'Color', type: ValueType.Vector3, hideHandle: false, onChange: setInputColor },
                ]} />
                <Canvas shader={unlit} geometry={geometry} color={colorVector3} nodeId={id} transform={new Matrix4(new Vector4(0, 0, -1.42, 0), new Vector4(1, 0, 0, 0), new Vector4(0, 0, 0, 0), new Vector4(0, 0, 0, 0))} />
            </Card.Body>
        </Card>
    );
};
