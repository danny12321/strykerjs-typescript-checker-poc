import { groupBuilder3000 } from "./group-builder.js";
import { settings } from "./settings.js";
import { getTreeFromFile } from "./tree.js";

async function start() {
    const tree = await getTreeFromFile(settings.fileName, settings.reportName);
    const builder = new groupBuilder3000(tree);
    let testGroups;
    while ((testGroups = builder.getNextNodeGroups()).length) {
        if (settings.logGroups) {
            console.log(testGroups);
        }
    }
    console.log(`Should be done ${builder.runCounter} iterations`);
}

start();
 