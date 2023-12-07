export interface IGeometryParser {
    parse()
}

export class Geometry { 
    constructor(source: string, parser: IGeometryParser){}
}