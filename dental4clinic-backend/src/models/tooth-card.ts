class ToothCard {
    userId: string;
    left8Up: number;
    left8Down: number;
    left7Up: number;
    left7Down: number;
    left6Up: number;
    left6Down: number;
    left5Up: number;
    left5Down: number;
    left4Up: number;
    left4Down: number;
    left3Up: number;
    left3Down: number;
    left2Up: number;
    left2Down: number;
    left1Up: number;
    left1Down: number;
    right1Up: number;
    right1Down: number;
    right2Up: number;
    right2Down: number;
    right3Up: number;
    right3Down: number;
    right4Up: number;
    right4Down: number;
    right5Up: number;
    right5Down: number;
    right6Up: number;
    right6Down: number;
    right7Up: number;
    right7Down: number;
    right8Up: number;
    right8Down: number;

    constructor(userId: string, toothData: { [key: string]: string }) {
        this.userId = userId;
        Object.keys(toothData).forEach(key => {
            this[key] = toothData[key]
            // if (toothData[key] === "-") {
            //   this[key] = 0;
            // }
            // todo ...
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
}

export { ToothCard };
