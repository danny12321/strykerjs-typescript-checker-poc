import * as ts from 'typescript';

let current = -1;
const indexts = [
    '"Stryker" - "Performance"',
    'const a: string = "";',
    'const a: number = "";',
]

const host = ts.createSolutionBuilderHost({
    ...ts.sys,
    readFile: (fileName: string, encoding: string) => {
        // change the file to reveal different errors
        if (fileName === 'C:/Users/DannyBe/Documents/dev/strykerjs-typescript-checker-poc/different-compiler/testfiles/src/index.ts') {
            current++;
            return indexts[current];
        }

        return ts.sys.readFile(fileName, encoding);
    }
});

const compiler = ts.createSolutionBuilder(host, ['testfiles/tsconfig.json'], { });

for (let index = 0; index < indexts.length; index++) {
    // repeatedly get the new errors while the file changes
    const a = compiler.getNextInvalidatedProject();

    if (a?.kind === ts.InvalidatedProjectKind.Build) {
        const errors = a.getSemanticDiagnostics();
        console.log(errors.map(e => e.messageText));
    }
}
