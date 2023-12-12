import { IGeometryParser } from '../domain/geometry'

export class ObjParser implements IGeometryParser {
    public static Instance = new ObjParser()

    getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    parse(objContent: string) {
        const positions: number[] = [];

        let uvs: number[] = [];
        const normals: number[] = [];
        const indices: number[] = [];
        let indexedUvs: number[] = [];
        const indexedNormals: number[] = [];
        let name: string = "";

        const lines = objContent.split('\n');
        let lIdCounter = 0
        const localUVs: any[] = [];

        lines.forEach((line) => {
            const tokens = line.trim().split(/\s+/);
            const type = tokens[0];
            switch (type) {
                case 'v':
                    positions.push(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
                    break;
                case 'vt':
                    uvs.push(parseFloat(tokens[1]), 1 - parseFloat(tokens[2]));
                    break;
                case 'vn':
                    normals.push(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
                    break;
                case 'f':
                    //f 1/1/1 2/2/1 4/3/1 3/4/1
                    // vertex index/texture coordinate index/normal index
                    const a = tokens[1]
                    const b = tokens[2]
                    const c = tokens[3]

                    const [vertexIndexA] = a.split('/')
                    const [vertexIndexB] = b.split('/')
                    const [vertexIndexC] = c.split('/')

                    if (tokens.length === 4) {
                        indices.push(parseInt(vertexIndexA) - 1);
                        indices.push(parseInt(vertexIndexB) - 1);
                        indices.push(parseInt(vertexIndexC) - 1);
                    }
                    if (tokens.length === 5) {
                        const d = tokens[4]
                        const [vertexIndexD] = d.split('/')


                        for (let index = 1; index < tokens.length; index++) {
                            const [vertexId, textureCoordsId] = tokens[index].split('/');
                            localUVs.push({ lid: lIdCounter, vid: parseInt(vertexId) - 1, tid: parseInt(textureCoordsId) - 1, uv0: uvs[(parseInt(textureCoordsId) - 1) * 2], uv1: uvs[(parseInt(textureCoordsId) - 1) * 2 + 1] })
                        }
                        lIdCounter++

                        indices.push(parseInt(vertexIndexA) - 1);
                        indices.push(parseInt(vertexIndexB) - 1);
                        indices.push(parseInt(vertexIndexC) - 1);

                        indices.push(parseInt(vertexIndexC) - 1);
                        indices.push(parseInt(vertexIndexD) - 1);
                        indices.push(parseInt(vertexIndexA) - 1);
                    }

                    break;
                case "o":
                    name = tokens[1];
                    break;
            }
        });

       // localUVs.sort((a, b) => a.vid - b.vid);
       // localUVs.sort((a, b) => a.lid - b.lid);
        //  localUVs.sort((a, b) => a.uv1 - b.uv1)

        for (const uv of localUVs) {
            indexedUvs.push(uv.tid)
        }

        //f 3/1/1 4/2/1 2/3/1 1/4/1
        //f 6/5/1 3/1/1 1/4/1 5/6/1
       // indexedUvs = [3, 2, 0, 1, 5, 4]

        //f 6/1/1 4/2/1 3/3/1 2/4/1
        //f 5/5/1 6/1/1 2/4/1 1/6/1
        //f 8/7/1 5/5/1 1/6/1 7/8/1
        indexedUvs = [5, 3, 2, 1, 4, 0, 7, 6]

        // uvs = [
        //     0.375, 0,
        //     0.625, 0,
        //     0.625, 0.25,
        //     0.375, 0.25,
        //     0.625, 0.5,
        //     0.375, 0.5,
        //     0.625, 0.75,
        //     0.375, 0.75,
        //     0.625, 1,
        //     0.375, 1,
        //     0.125, 0.5,
        //     0.125, 0.75,
        //     0.875, 0.5,
        //     0.875, 0.75
        // ]
        // indexedUvs = [
        //     0, 3, 2, 1, 
        //     3, 2, 5, 4, 
        //     7, 6, 5, 4, 
        //     9, 8, 7, 6, 
        //     11, 10, 7, 5, 
        //     13, 12, 6, 4
        // ]

        // const faces_vertex_indexes = [
        //     0, 1, 3, 3, 2, 0, 
        //     2, 3, 7, 7, 6, 2, 
        //     6, 7, 5, 5, 4, 6, 
        //     4, 5, 1, 1, 0, 4, 
        //     2, 6, 4, 4, 0, 2, 
        //     7, 3, 1, 1, 5, 7
        // ]

        const uvsIndexesArray = new Uint32Array(indexedUvs)
        const positionsArray = new Float32Array(positions);
        const uvsArray = new Float32Array(uvs);
        const normalsArray = new Float32Array(indexedNormals);
        const indicesArray = new Uint32Array(indices);

        return { name, positions: positionsArray, uvs: uvsArray, uvIndexes: uvsIndexesArray, normals: normalsArray, indices: indicesArray }
    }
}