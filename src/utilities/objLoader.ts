import { IGeometryParser } from '../domain/geometry'

export class ObjParser implements IGeometryParser {
    public static Instance = new ObjParser()

    parse(objContent: string) {
        const positions: number[] = [];

        const uvs: number[] = [];
        const normals: number[] = [];
        const indices: number[] = [];
        const indexedUvs: number[] = [];
        const indexedNormals: number[] = [];
        let name: string = "";

        const lines = objContent.split('\n');

        lines.forEach((line) => {
            const tokens = line.trim().split(/\s+/);
            const type = tokens[0];
            switch (type) {
                case 'v':
                    positions.push(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
                    break;
                case 'vt':
                    uvs.push(parseFloat(tokens[1]), parseFloat(tokens[2]));
                    break;
                case 'vn':
                    normals.push(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
                    break;
                case 'f':
                    //f 1/1/1 2/2/1 4/3/1 3/4/1
                    // vertex index/texture coordinate index/normal index
                    const a = tokens[1]
                    const b = tokens[2].split('/')[0]
                    const c = tokens[3].split('/')[0]

                    const [vertexIndexA, textureCoordIndexA, normalIndexA] = a.split('/')[0]
                    const [vertexIndexB, textureCoordIndexB, normalIndexB] = b.split('/')[0]
                    const [vertexIndexC, textureCoordIndexC, normalIndexC] = c.split('/')[0]

                    if (tokens.length === 4) {
                        indices.push(parseInt(vertexIndexA) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexA) - 1)
                        indexedNormals.push(parseInt(normalIndexA) - 1)
                        indices.push(parseInt(vertexIndexB) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexB) - 1)
                        indexedNormals.push(parseInt(normalIndexB) - 1)
                        indices.push(parseInt(vertexIndexC) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexC) - 1)
                        indexedNormals.push(parseInt(normalIndexC) - 1)
                    }
                    if (tokens.length === 5) {
                        const d = tokens[4];
                        const [vertexIndexD, textureCoordIndexD, normalIndexD] = d.split('/')[0]

                        indices.push(parseInt(vertexIndexA) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexA) - 1)
                        indexedNormals.push(parseInt(normalIndexA) - 1)
                        indices.push(parseInt(vertexIndexB) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexB) - 1)
                        indexedNormals.push(parseInt(normalIndexB) - 1)
                        indices.push(parseInt(vertexIndexC) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexC) - 1)
                        indexedNormals.push(parseInt(normalIndexC) - 1)

                        indices.push(parseInt(vertexIndexC) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexC) - 1)
                        indexedNormals.push(parseInt(normalIndexC) - 1)
                        indices.push(parseInt(vertexIndexD) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexD) - 1)
                        indexedNormals.push(parseInt(normalIndexD) - 1)
                        indices.push(parseInt(vertexIndexA) - 1);
                        indexedUvs.push(parseInt(textureCoordIndexA) - 1)
                        indexedNormals.push(parseInt(normalIndexA) - 1)
                    }

                    break;
                case "o":
                    name = tokens[1];
                    break;
            }
        });

        const uvsIndexesArray = new Uint32Array(indexedUvs)
        const positionsArray = new Float32Array(positions);
        const uvsArray = new Float32Array(uvs);
        const normalsArray = new Float32Array(indexedNormals);
        const paddedSize = Math.ceil(indices.length * 2 / 4) * 4;
        const indicesArray = new Uint16Array(paddedSize);
        indicesArray.set(indices)

        return { name, positions: positionsArray, uvs: uvsArray, uvIndexes: uvsIndexesArray, normals: normalsArray, indices: indicesArray }
    }
}