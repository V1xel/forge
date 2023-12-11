import { DataType, IDataType } from "./dataType";

export interface IGeometryParser {
    parse(source: string): {
        name: string;
        positions: Float32Array;
        uvs: Float32Array;
        normals: Float32Array;
        indices: Uint32Array;
        uvIndexes: Uint32Array;
    }
}

export class Geometry implements IDataType {
    _name: string;
    _positions: Float32Array;
    _uvs: Float32Array;
    _normals: Float32Array;
    _indices: Uint32Array;
    _uvIndexes: Uint32Array;
    constructor(source: string, parser: IGeometryParser) {
        const { name, positions, uvs, normals, indices, uvIndexes } = parser.parse(source)
        this._name = name
        this._positions = positions
        this._uvs = uvs
        this._normals = normals
        this._indices = indices
        this._uvIndexes = uvIndexes
    }
    
    getType(): DataType {
        return DataType.Geometry
    }
}