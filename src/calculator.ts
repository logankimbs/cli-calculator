enum Operation {
    Add = '+',
    Subtract = '-',
    Multiply = '*',
    Divide = '/'
}

export class Calculator {
    private currentValue: number;
    private pendingValue: number | null;
    private pendingOperation: Operation | null;
    private newNumber: boolean;

    constructor() {
        this.currentValue = 0;
        this.pendingValue = null;
        this.pendingOperation = null;
        this.newNumber = false;
    }

    public processInput(input) {
        for (const char of input) {
            if (char === 'c') {
                this.clear();
            } else if (char === '!') {
                this.toggleSign();
            } else if (char === '%') {
                this.percentage();
            } else if (char === '=') {
                this.calculate();
            } else if (Object.values(Operation).includes(char)) {
                this.setOperation(char);
            } else if ('0123456789'.includes(char)) {
                if (this.newNumber) {
                    this.currentValue = 0;
                    this.newNumber = false;
                }

                this.appendNumber(char);
            }
        }
    }

    private appendNumber(number: string) {
        this.currentValue = this.currentValue * 10 + parseInt(number, 10);
    }

    private setOperation(operation: Operation) {
        if (this.pendingOperation === null) {
            this.pendingOperation = operation;
            this.pendingValue = this.currentValue;
            this.newNumber = true;
        } else {
            this.calculate();
            this.pendingValue = this.currentValue;
            this.pendingOperation = operation;
            this.newNumber = true;
        }
    }

    private calculate() {
        if (this.pendingValue !== null) {
            switch (this.pendingOperation) {
                case Operation.Add:
                    this.currentValue = this.pendingValue + this.currentValue;
                    break;
                case Operation.Subtract:
                    this.currentValue = this.pendingValue - this.currentValue;
                    break;
                case Operation.Multiply:
                    this.currentValue = this.pendingValue * this.currentValue;
                    break;
                case Operation.Divide:
                    if (this.currentValue === 0) throw new Error('Error');
                    this.currentValue = this.pendingValue / this.currentValue;
                    break;
            }

            this.pendingValue = null;
            this.pendingOperation = null;
            this.newNumber = true;
        }
    }

    private clear() {
        this.currentValue = 0;
        this.pendingValue = null;
        this.pendingOperation = null;
        this.newNumber = false;
    }

    private toggleSign() {
        this.currentValue = -this.currentValue;
    }

    private percentage() {
        this.currentValue = this.currentValue / 100;
    }

    public getCurrentValue() {
        return this.currentValue;
    }
}
