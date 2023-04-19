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
        const result = calculator.calculate(input);
        rl.setPrompt(`${result}\n> `);
    } catch (e) {
        rl.setPrompt(`Error: ${e.message}\n> `);
    }

    rl.prompt();
});
