/**
 * Class representing a timer screen.
 */
export class TimScreen {
    /** The HTML div element representing the timer screen. */
    public divElement: HTMLDivElement;

    /**
     * Creates an instance of TimScreen.
     */
    constructor() {
        this.divElement = document.createElement('div');
        this.divElement.className = 'screen';
    }

    /**
     * Sets a timer on the screen and updates the display until the time runs out.
     * @param {number} time - The time in seconds for the timer.
     */
    public timer(time: number): void {
        const startTime = performance.now();

        const updateDisplay = () => {
            const elapsedTime = performance.now() - startTime;
            const remainingTime = time - elapsedTime / 1000; // Convert milliseconds to seconds
            if (remainingTime <= 0) {
                clearInterval(countdown);
                this.divElement.textContent = "";
            } else {
                this.divElement.textContent = String(remainingTime.toFixed(1)); // Display remaining time with one decimal place
            }
        };

        updateDisplay(); // Initial call to display the timer immediately

        const countdown = setInterval(updateDisplay, 500); // Update the display every 500 milliseconds
    }
}
