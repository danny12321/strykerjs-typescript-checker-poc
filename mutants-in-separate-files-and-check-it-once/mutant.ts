interface Mutant {
    id: string,
    location: {
        start: Position,
        end: Position
    },
    replacement: string,
    fileName: string
}

interface Position {
    line: number;
    column: number;
}