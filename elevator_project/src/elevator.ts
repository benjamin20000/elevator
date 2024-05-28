/**
 * Class representing an Elevator.
 */
export class Elevator {
    /** The HTML div element representing the elevator. */
    public divElement: HTMLDivElement;
    /** The image element representing the elevator. */
    public elevatorImg: HTMLImageElement;
    /** The current destination floor of the elevator. */
    public currentDestinationFloor: number = 0;
    /** The finish time of the elevator's current task. */
    public finishTime: number = 0;
    /** The audio object for playing a sound when the elevator arrives. */
    private audio = new Audio('../music/ding.mp3');

    /**
     * Creates an instance of Elevator.
     */
    constructor() {
        this.divElement = document.createElement('div');
        this.divElement.className = 'elevator';

        this.elevatorImg = document.createElement('img');
        this.elevatorImg.src = '../images/elv.png';
        this.divElement.appendChild(this.elevatorImg);
    }

    /**
     * Calculates the speed required to move between floors.
     * @param {number} origin - The current floor.
     * @param {number} targetFloor - The target floor.
     * @returns {number} The calculated speed.
     */
    private speedCalcul(origin: number, targetFloor: number): number {
        return Math.abs(origin - targetFloor) * 0.5;
    }

    /**
     * Calculates the target position for the elevator.
     * @param {number} targetFloor - The target floor.
     * @returns {number} The calculated target position.
     */
    private targetCalcul(targetFloor: number): number {
        return -targetFloor * 110;
    }

    /**
     * Updates the current destination floor and returns the previous destination floor.
     * @param {number} targetFloor - The new target floor.
     * @returns {number} The previous destination floor.
     */
    public UpDestination(targetFloor: number): number {
        let originDestinationFloor = this.currentDestinationFloor;
        this.currentDestinationFloor = targetFloor;
        return originDestinationFloor;
    }

    /**
     * Plays a sound when the elevator arrives at the target floor.
     */
    public gling(): void {
        setTimeout(() => {
            this.audio.play();
        }, (this.finishTime - Date.now() - 2000));
    }

    /**
     * Moves the elevator to the target floor.
     * @param {number} origin - The current floor.
     * @param {number} targetFloor - The target floor.
     */
    public move(origin: number, targetFloor: number): void {
        let speed = this.speedCalcul(origin, targetFloor);
        let target = this.targetCalcul(targetFloor);

        this.divElement.style.transition = `transform ${speed}s ease`;
        this.divElement.style.transform = `translateY(${target}px)`;
    }

    /**
     * Calculates the distance between the current floor and a new floor.
     * @param {number} newFloor - The new floor.
     * @returns {number} The floor distance.
     */
    public floorDistance(newFloor: number): number {
        return Math.abs(this.currentDestinationFloor - newFloor);
    }

    /**
     * Updates the finish time to the current time if it has already passed.
     */
    public TimeUpdate(): void {
        if (this.finishTime < Date.now()) {
            this.finishTime = Date.now();
        }
    }

    /**
     * Adds the time required to reach the target floor to the finish time.
     * @param {number} targetFloor - The target floor.
     * @returns {number} The original finish time before adding the new time.
     */
    public TimeAdd(targetFloor: number): number {
        this.TimeUpdate();
        let addTime = this.floorDistance(targetFloor) * 0.5 + 2;
        this.finishTime += addTime * 1000;
        return this.finishTime - addTime * 1000;
    }
}
