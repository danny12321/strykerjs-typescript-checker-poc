import { types, parseAsync, traverse, NodePath } from '@babel/core';
import { readFileSync } from 'fs';
import ts from 'typescript';
import { getInfoFromFiles } from "ts-type-info";
import path from 'path';
import { ClassDeclaration, ConditionalExpression, ExportedDeclarations, FunctionDeclaration, Project, SourceFile, VariableDeclaration } from 'ts-morph';

void function () {
    const project = new Project({
        tsConfigFilePath: __dirname + '/../testfiles/tsconfig.json',
    });

    const exports = getReturnTypes(project.getSourceFile('index.ts')!)
    const mutatedExports = getReturnTypes(project.getSourceFile('index-mutated.ts')!)

    console.log(JSON.stringify(exports) === JSON.stringify(mutatedExports) ? 'No changes in exports' : 'Found changes in exports');

    function getReturnTypes(sourceFile: SourceFile) {
        const exports = sourceFile.getExportedDeclarations();
        let exportsString: any = {}

        if (!exports) return;

        for (const [name, declarations] of exports) {
            exportsString[name] = declarations.map(handleExportDeclaration)
        }

        return exportsString;
    }

    function handleExportDeclaration(value: ExportedDeclarations, index: number, array: ExportedDeclarations[]) {

        if (value.getType().isClass()) {
            const classDeclaration = value as ClassDeclaration;
            const name = classDeclaration.getName() || 'unknown';

            return {
                [name]: classDeclaration.getMethods().filter(m => {
                    return m.getScope() != 'private'
                }).map(m => ({
                    [m.getName()]: m.getReturnType().getText()
                }))
            }
        }

        if (value.getKindName() === 'FunctionDeclaration') {
            const functionDeclaration = value as FunctionDeclaration;
            return functionDeclaration.getReturnType().getText()
        }

        if (value.getKindName() === 'VariableDeclaration') {
            const variableDeclaration = value as VariableDeclaration;
            return { [variableDeclaration.getName()]: value.getType().getText() };
        }

        console.log('dont know the export: ' + value.getKindName())
        return {
            [value.getKindName()]: value.getType().getText()
        };
    }
}()
