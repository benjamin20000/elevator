
import { TimScreen } from "./timer";

/**
 * Concrete implementation of a Floor.
 */
export class Floor {
    /** The HTML div element representing the floor. */
    public divElement: HTMLDivElement;
    /** The screen to display the timer. */
    private screen = new TimScreen();

    /**
     * Creates an instance of Floor.
     * @param {number} floorNum - The floor number.
     * @param {(floorNum: number) => void} onClick - The callback function to handle button clicks for this floor.
     */
    constructor(floorNum: number, onClick: (floorNum: number) => void) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'floor';

        this.addBlackLine();
        this.addButton(floorNum, onClick);
        this.addScreen();
    }

    /**
     * Adds a black line to the floor's div element.
     */
    private addBlackLine(): void {
        const blackLine = document.createElement('div');
        blackLine.className = 'blackline';
        this.divElement.appendChild(blackLine);
    }

    /**
     * Adds a button to the floor's div element.
     * @param {number} floorNum - The floor number.
     * @param {(floorNum: number) => void} onClick - The callback function to handle button clicks for this floor.
     */
    private addButton(floorNum: number, onClick: (floorNum: number) => void): void {
        const button = document.createElement('button');
        button.className = 'metal linear';
        button.textContent = `${floorNum}`;
        button.addEventListener('click', () => onClick(floorNum));
        this.divElement.appendChild(button);
    }

    /**
     * Adds a screen element to the floor's div element.
     */
    private addScreen(): void {
        this.divElement.appendChild(this.screen.divElement);
    }

    /**
     * Sets the timer on the screen for this floor.
     * @param {number} time - The time to be displayed on the timer.
     */
    public setTimer(time: number): void {
        this.screen.timer(time);
    }
}
