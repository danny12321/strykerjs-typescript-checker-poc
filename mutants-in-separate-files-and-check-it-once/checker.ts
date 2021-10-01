import ts = require('typescript');
import { readFileSync } from 'fs';
import { EOL } from 'os';
import { options } from './options';

interface compileResult {
    diagnostic: ts.Diagnostic,
    mutant_id: string
}

export interface checkResult {
    [key: string]: string
}

interface fileMemory {
    [key: string]: string
}

interface mutadedFileMemory {
    [key: string]: {
        mutant: Mutant,
        content: string,
        name: string
    }
}

function toPosixFileName(fileName: string): string {
    return fileName.replace(/\\/g, '/');
}

export default class Checker {
    private mutadedFiles: mutadedFileMemory = {};
    private orginalFiles: fileMemory = {};

    public addCheck(mutant: Mutant) {
        const file = this.readFile(mutant.fileName);
        const start = this.getOffset(mutant, mutant.location.start, file);
        const end = this.getOffset(mutant, mutant.location.end, file);
        const mutaded = file.substring(0, start) + mutant.replacement + file.substring(end, file.length);

        const name = toPosixFileName(mutant.fileName.replace('.ts', `-strykermutant(${mutant.id}).ts`))
        this.mutadedFiles[name] = {
            mutant,
            content: mutaded,
            name: name
        }
    }

    private readFile(path: string) {
        path = toPosixFileName(path);
        if (this.orginalFiles[path]) {
            return this.orginalFiles[path];
        }

        const content = readFileSync(path).toString();
        this.orginalFiles[path] = content;

        return content
    }

    private getOffset(mutant: Mutant, pos: Position, content: string): number {
        const sourceFile = ts.createSourceFile(mutant.fileName, content, ts.ScriptTarget.Latest, false, undefined);
        return sourceFile.getPositionOfLineAndCharacter(pos.line, pos.column);
    }

    public checkAll(): checkResult {
        const tsconfigFile = options.ts_config_path;
        const fileNames = Object.keys(this.mutadedFiles);
        const errors: compileResult[] = [];

        const compiler = ts.createSolutionBuilderWithWatch(
            ts.createSolutionBuilderWithWatchHost(
                {
                    ...ts.sys,
                    readFile: (fileName: string) => {
                        fileName = toPosixFileName(fileName);

                        if (this.mutadedFiles[fileName]) return this.mutadedFiles[fileName].content

                        return this.readFile(fileName);
                    },
                    readDirectory: (path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number) => {
                        const filedirs = ts.sys.readDirectory(path, extensions, exclude, include, depth);

                        fileNames.forEach(file => {
                            if (file.match(path)) {
                                filedirs.push(file);
                            }
                        });

                        return filedirs;
                    },
                    writeFile: (filePath, data) => {
                    },
                    createDirectory: () => {
                        // Idle, no need to create directories in the hybrid fs
                    },
                    clearScreen() {
                        // idle, never clear the screen
                    },
                    watchDirectory: (): ts.FileWatcher => {
                        // this is used to see if new files are added to a directory. Can safely be ignored for mutation testing.
                        return {
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                            close() { },
                        };
                    },
                },
                undefined,
                (error) => {
                    if (!error.file) {
                        console.log('found error without file')
                        return;
                    };

                    const regex = /strykermutant\((\d*)\).ts$/;
                    const match = error.file.fileName.match(regex);

                    if (match) {
                        errors.push({
                            diagnostic: error,
                            mutant_id: match[1]
                        })
                    }
                },
                (status) => { },
                (summary) => { }
            ),
            [tsconfigFile],
            {}
        );

        compiler.build();

        return this.handleErrors(errors);
    }

    private handleErrors(errors: compileResult[]): checkResult {
        const formattedErrors = {};

        const mutantsWithErrors = new Set(errors.map(e => e.mutant_id));

        mutantsWithErrors.forEach((mutant) => {
            const errorsFromMutant = errors.filter(m => m.mutant_id === mutant).map(m => m.diagnostic);

            const errorText = ts.formatDiagnostics(errorsFromMutant, {
                getCanonicalFileName: (fileName) => fileName,
                getCurrentDirectory: process.cwd,
                getNewLine: () => EOL,
            });

            formattedErrors[mutant] = errorText;
        });

        return formattedErrors;
    }
}