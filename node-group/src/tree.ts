import madge from 'madge';
import fs from 'fs';

export interface IDependencyTree {
    [key: string]: {
        dependencies: string[];
        mutantCount: number;
    }
}

export const dependencyTree = {
    "A": { dependencies: [], mutantCount: 1 },
    "B": { dependencies: ["A"], mutantCount: 1 },
    "C": { dependencies: ["A", "E", "H"], mutantCount: 1 },
    "D": { dependencies: ["A", "C", "E", "H"], mutantCount: 1 },
    "E": { dependencies: ["A", "C", "E", "H"], mutantCount: 1 },
    "F": { dependencies: ["A", "C", "E", "H"], mutantCount: 1 },
    "G": { dependencies: ["A", "C", "E", "F", "H"], mutantCount: 1 },
    "H": { dependencies: ["A", "C", "E"], mutantCount: 1 },
};

export const cucumberDependencyTree: IDependencyTree = {
    "index.ts": { dependencies: [], mutantCount: 2 },
    "cucumber-test-runner.ts": { dependencies: ["index.ts"], mutantCount: 89 },
    "cucumber-wrapper.ts": { dependencies: ["stryker-formatter.ts", "cucumber-test-runner.ts", "index.ts"], mutantCount: 3 },
    "plugin-tokens.ts": { dependencies: ["index.ts", "cucumber-test-runner.ts"], mutantCount: 1 },
    "stryker-formatter.ts": { dependencies: ["index.ts", "cucumber-test-runner.ts"], mutantCount: 127 },
};


export async function getTreeFromFile(file: string, jsonReport?: string): Promise<IDependencyTree> {
        const res = await madge(file);
        res.image('graph.svg')

        let tree: IDependencyTree = {}

        const result = res.obj();
        const resultKeys = Object.keys(result)

        const mutationReport = jsonReport && JSON.parse(fs.readFileSync(jsonReport).toString());

        if (mutationReport) {
            console.log(`Should have ${Object.keys(mutationReport.files).length} files, found ${resultKeys.length}`)
        }

        resultKeys.forEach(key => {
            tree[key] = {
                dependencies: result[key],
                mutantCount: jsonReport ? getMutationCount(key, mutationReport) : 1
            }
        });

        return (tree);
}

function getMutationCount(file: string, report: any): number {
    const fullFileName = Object.keys(report.files).find(fileName => {
        fileName = fileName.replace(/\\/g, '/');
        return new RegExp(".*" + file).test(fileName)
    })

    if (!fullFileName) {
        return 0;
    }

    return report.files[fullFileName].mutants.length;
}
