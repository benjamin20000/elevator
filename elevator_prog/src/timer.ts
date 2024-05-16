
export class TimScreen {
    public divElement: HTMLDivElement;

    constructor() {
        this.divElement = document.createElement('div');
        this.divElement.className = 'screen';
    }

    public timer(time: number) {
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
    
        updateDisplay(); // Call updateDisplay 
    
        const countdown = setInterval(updateDisplay, 500); // Update every 500 milliseconds
    }
}