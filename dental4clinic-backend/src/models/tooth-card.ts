class ToothCard {
    userId: string;
    left8Up: string;
    left8Down: string;
    left7Up: string;
    left7Down: string;
    left6Up: string;
    left6Down: string;
    left5Up: string;
    left5Down: string;
    left4Up: string;
    left4Down: string;
    left3Up: string;
    left3Down: string;
    left2Up: string;
    left2Down: string;
    left1Up: string;
    left1Down: string;
    right1Up: string;
    right1Down: string;
    right2Up: string;
    right2Down: string;
    right3Up: string;
    right3Down: string;
    right4Up: string;
    right4Down: string;
    right5Up: string;
    right5Down: string;
    right6Up: string;
    right6Down: string;
    right7Up: string;
    right7Down: string;
    right8Up: string;
    right8Down: string;

    constructor(userId: string, toothData: { [key: number]: string }) {
        this.userId = userId;
        Object.keys(toothData).forEach(key => {
            this[key] = toothData[key];
        });
    }

    toMongoObject(): any {
        return {
            userId: this.userId,
            left8Up: this.left8Up,
            left8Down: this.left8Down,
            left7Up: this.left7Up,
            left7Down: this.left7Down,
            left6Up: this.left6Up,
            left6Down: this.left6Down,
            left5Up: this.left5Up,
            left5Down: this.left5Down,
            left4Up: this.left4Up,
            left4Down: this.left4Down,
            left3Up: this.left3Up,
            left3Down: this.left3Down,
            left2Up: this.left2Up,
            left2Down: this.left2Down,
            left1Up: this.left1Up,
            left1Down: this.left1Down,
            right1Up: this.right1Up,
            right1Down: this.right1Down,
            right2Up: this.right2Up,
            right2Down: this.right2Down,
            right3Up: this.right3Up,
            right3Down: this.right3Down,
            right4Up: this.right4Up,
            right4Down: this.right4Down,
            right5Up: this.right5Up,
            right5Down: this.right5Down,
            right6Up: this.right6Up,
            right6Down: this.right6Down,
            right7Up: this.right7Up,
            right7Down: this.right7Down,
            right8Up: this.right8Up,
            right8Down: this.right8Down
        };
    }

    convertStringsToNumbers(): void {
        const mapping: { [key: string]: number } = {
            "-": 0, "I": 1, "II": 2, "III": 3, "A": 4,
            "O": 5, "P": 6, "C": 7, "Pt": 8, "R": 9
        };

        Object.keys(this).forEach(key => {
            if (key !== "userId" && typeof this[key] === 'string') {
                this[key] = mapping[this[key]];
            }
        });
    }

    convertNumbersToStrings(): void {
        const mapping: { [key: number]: string } = {
            0: "-", 1: "I", 2: "II", 3: "III", 4: "A",
            5: "O", 6: "P", 7: "C", 8: "Pt", 9: "R"
        };

        Object.keys(this).forEach(key => {
            if (key !== "userId" && typeof this[key] === 'number') {
                this[key] = mapping[this[key]];
            }
        });
    }
}

export { ToothCard };
