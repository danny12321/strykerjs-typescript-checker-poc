import { quickMath } from "./file-to-import";
import fs from 'fs';

export class ExportDifferent {
    public run() {
        return Math.random();
    }

    private runPrivate() {
        return quickMath();
    }

    public runPublic() {
        return'';
    }
}

class NoExportShouldntError {
    public run() {
        return Math.random();
    }
}

export const stringExport = "String export";

export const objectExport = {
    key: 'value'.toString()
}

export function ExportFunction() {
    return Math.random()
}