import { mat4, vec3 } from "wgpu-matrix";
import { Matrix4 } from "../../domain/matrix/matrix4";

export class TransformationMatrix {
    private static projectionMatrix = mat4.perspective(
        (2 * Math.PI) / 5,
        1,
        1,
        100
    );

    public static getProjectionMatrix(transform: Matrix4) {
        const modelViewProjectionMatrix = mat4.create();
        const position = transform.getValue().row1;
        const rotation = transform.getValue().row2;

        const viewMatrix = mat4.identity();
        mat4.translate(viewMatrix, vec3.fromValues(position.x, position.y, position.z), viewMatrix); //z:-1.42

        mat4.rotate(
            viewMatrix,
            vec3.fromValues(rotation.x, rotation.y, rotation.z),//x:1
            1.5708,
            viewMatrix
        );

        mat4.multiply(this.projectionMatrix, viewMatrix, modelViewProjectionMatrix);

        return modelViewProjectionMatrix as Float32Array;
    }
}