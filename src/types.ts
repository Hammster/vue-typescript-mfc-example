export interface IFormation {
    name: string,
    // 4-4-2, one(goalkeeper)-four(defense)-four(midfield)-two(striker),
    defense: number
    midfield: number
    striker: number
    // systems with broken down numberation (1-)3-3-1-3
    alias: string[],
    positions: Position[]
}

// tslint:disable-next-line
export type Position = {
    x: number,
    y: number
}

