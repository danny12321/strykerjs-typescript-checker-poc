import { readFileSync } from 'fs';
import { fork } from 'child_process';
import { options } from './options';
import { checkResult } from './checker';

const mutants: Mutant[] = JSON.parse(readFileSync(`./mutant-data/${options.mutantData}`).toString());
const childMutantAmount = mutants.length / options.child_processes;

const runs: Promise<checkResult>[] = [];
for (let index = 0; index < options.child_processes; index++) {
    const run = new Promise<checkResult>((resolve) => {

        const child = fork('./dist/checker-proxy', [], {});
        const mutantsPart = mutants.splice(0, childMutantAmount);
        child.send({
            key: 'mutants',
            mutants: mutantsPart
        })
        
        child.on('message', (message: any) => {
            if (message.key === 'result') {
                resolve(message.result);
            }
        })
    });

    runs.push(run);
}

(async () => {
    let result: checkResult = {};
    console.log('Starting checker(s)');

    console.time('Time it took to get all errors');
    (await Promise.all(runs)).forEach(r => result = {...result, ...r});
    console.timeEnd('Time it took to get all errors');
    
    console.log(`Found: ${Object.keys(result).length} mutants with error(s)`);
})();
