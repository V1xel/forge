import { IGeometryParser } from '../domain/geometry'

export class ObjParser implements IGeometryParser {
    public static Instance = new ObjParser()

    parse(objContent: string) {
        const positions: number[] = [];

        const uvMap: { [Id: string]: string } = {}
        const uvs: number[] = [];
        const normals: number[] = [];
        const indices: number[] = [];
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
                    const a = tokens[1].split('/')[0]
                    uvMap[a] = tokens[1].split('/')[1]
                    const b = tokens[2].split('/')[0]
                    uvMap[b] = tokens[2].split('/')[1]
                    const c = tokens[3].split('/')[0]
                    uvMap[c] = tokens[3].split('/')[1]

                    if (tokens.length === 4) {
                        indices.push(parseInt(a) - 1);
                        indices.push(parseInt(b) - 1);
                        indices.push(parseInt(c) - 1);
                    }
                    if (tokens.length === 5) {
                        const d = tokens[4].split('/')[0];
                        uvMap[d] = tokens[4].split('/')[1]

                        indices.push(parseInt(a) - 1);
                        indices.push(parseInt(b) - 1);
                        indices.push(parseInt(c) - 1);

                        indices.push(parseInt(c) - 1);
                        indices.push(parseInt(d) - 1);
                        indices.push(parseInt(a) - 1);
                    }

                    break;
                case "o":
                    name = tokens[1];
                    break;
            }
        });

        const positionsArray = new Float32Array(positions);
        const uvsArray = new Float32Array(uvs);
        const normalsArray = new Float32Array(normals);
        const paddedSize = Math.ceil(indices.length * 2 / 4) * 4;
        const indicesArray = new Uint16Array(paddedSize);
        indicesArray.set(indices)

        return { name, positions: positionsArray, uvs: uvsArray, normals: normalsArray, indices: indicesArray }
    }
}