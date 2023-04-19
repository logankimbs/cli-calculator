import * as readline from "readline";

class Calculator {
    private _operation: Array<number | string>;
    private _result: number;
    private _hasEqualSign: boolean;

    constructor() {
        this._operation = [];
        this._result = 0;
        this._hasEqualSign = false;
    }

    public calculate(input: string): number {
        this._validate(input);
        this._sanitizeAndParse(input);

        if (this._hasEqualSign) {
            this._result = this._calculate();
            this._operation = [this._result];
            this._hasEqualSign = false;
        }

        if (this._operation.length > 0) {
            this._result = this._operation[this._operation.length - 1] as number;
        }

        return this._result;
    }

    private _validate(input: string): void {
        input = input.toLowerCase();

        const operators = new Set(['+', '-', '*', '/']);
        let prevCharIsOperator = false;

        if (operators.has(input[input.length - 1])) {
            throw new Error('Input cannot end with an operator');
        }

        for (const currentChar of input) {
            if (/[^0-9+\-*/().!c%=]/.test(currentChar)) {
                throw new Error("Invalid character found");
            }

            if (currentChar == '=' && input[input.length - 1] != '=') {
                throw new Error("Equal sign must be the last character");
            }

            if (operators.has(currentChar)) {
                if (prevCharIsOperator) {
                    throw new Error("Multiple consecutive operators found");
                }
                prevCharIsOperator = true;
            } else {
                prevCharIsOperator = false;
            }
        }
    }

    private _sanitizeAndParse(input: string): void {
        input = input.replace(/\s/g, ''); // Remove all whitespace

        if (input.startsWith('(')) {
            this._operation = [];
            this._result = 0;
        }

        let currentNum = '';
        const addToOperation = () => {
            if (currentNum !== '') {
                this._operation.push(parseFloat(currentNum));
                currentNum = '';
            }
        };

        for (const currentChar of input) {
            if (/\d|\./.test(currentChar)) {
                currentNum += currentChar;
            } else {
                switch (currentChar) {
                    case 'c':
                        this._operation = [];
                        this._result = 0;
                        this._hasEqualSign = false;
                        break;
                    case '!':
                        addToOperation();
                        this._result *= -1;
                        this._operation[this._operation.length - 1] = this._result;
                        break;
                    case '%':
                        addToOperation();
                        this._result /= 100;
                        this._operation[this._operation.length - 1] = this._result;
                        break;
                    case '=':
                        this._hasEqualSign = true;
                        break;
                    default:
                        addToOperation();
                        this._operation.push(currentChar);
                }
            }
        }

        addToOperation();
    }

    private _calculate(): number {
        const output = new Function('return ' + this._operation.join(''))();
        if (typeof output === "number" && !isNaN(output) && isFinite(output)) {
            return output;
        } else {
            throw new Error('Cannot divide by zero');
        }
    }
}

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
