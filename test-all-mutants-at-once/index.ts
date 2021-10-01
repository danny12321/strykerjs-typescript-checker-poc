import * as ts from "typescript";

const fileNames = ['./.stryker-tmp/sandbox/src/index.ts']
const options:ts.CompilerOptions = { }

const host = ts.createCompilerHost(options);
host.readFile = (fileName: string) => {
  return ts.sys.readFile(fileName).replace('// @ts-nocheck', '')
};

let program = ts.createProgram(fileNames, options, host);
let emitResult = program.emit();

let allDiagnostics = ts
  .getPreEmitDiagnostics(program)
  .concat(emitResult.diagnostics);

allDiagnostics.forEach(diagnostic => {
  if (diagnostic.file) {
    let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
    let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  } else {
    console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
  }
});

let exitCode = emitResult.emitSkipped ? 1 : 0;
console.log(`Process exiting with code '${exitCode}'.`);
process.exit(exitCode);
