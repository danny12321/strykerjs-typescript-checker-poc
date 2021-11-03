import fs from 'fs';

export class ExportDifferent {
    private test = new Date();

    public run() {
        return [this.test];
    }

    private runPrivate() {
        return 1;
    }

    public runPublic() {
        return'';
    }
}

class NoExportShouldntError {
    public run() {
        return null;
    }
}

export const stringExport = "";

export const objectExport = {
    key: 'e'.toString()

}

export function ExportFunction() { }