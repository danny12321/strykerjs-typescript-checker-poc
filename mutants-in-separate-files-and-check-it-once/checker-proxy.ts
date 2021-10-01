import Checker from "./checker";

const checker = new Checker();

function handleMutants(mutants: Mutant[]) {
    mutants.forEach(m => checker.addCheck(m));
    const result = checker.checkAll();
    process.send({
        key: 'result',
        result: result
    })

    process.exit(0);
}

process.on('message', (message: any) => {
    if (message.key === 'mutants') {
        handleMutants(message.mutants);
    }
});
