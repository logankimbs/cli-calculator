import * as readline from "readline";
import { Calculator } from "./src/calculator";

const calculator = new Calculator();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('0\n> ');
rl.prompt();
rl.on('line', (input) => {
    try {
        calculator.processInput(input);
        rl.setPrompt(`${calculator.getCurrentValue()}\n> `);
    } catch (e) {
        rl.setPrompt(`${e.message}\n> `);
    }

    rl.prompt();
});
