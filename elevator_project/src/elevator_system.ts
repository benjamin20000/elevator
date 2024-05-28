import { Elevator } from "./elevator";
import { ElevatorFactory } from "./factories/elevator_factory";
import { Floor } from "./floor";
/**
 * Class representing an Elevator System.
 */
export class ElevatorSystem {
    /** The HTML div element representing the elevator shaft. */
    public divElement: HTMLDivElement;
    /** Array of Elevator objects. */
    public elvArr: Elevator[] = [];
    /**
     * Creates an instance of ElevatorSystem.
     * @param {number} elvNum - The number of elevators.
     */
    constructor(elvNum: number) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'ElevatorShaft';
        const elevatorFactory = new ElevatorFactory();

        for (let i = 0; i < elvNum; i++) {
            const elevator = elevatorFactory.createElevator();
            this.elvArr.push(elevator); // Push elevator into array
            this.divElement.appendChild(elevator.divElement);
        }
    }

    /**
     * Selects the most suitable elevator for the given target floor.
     * @param {number} targetFloor - The floor where the elevator is needed.
     * @returns {Elevator} The selected elevator.
     */
    private selectElv(targetFloor: number): Elevator {
        let minTime: number = Infinity;
        let res: number = 0;

        for (let i = 0; i < this.elvArr.length; i++) {
            this.elvArr[i].TimeUpdate();
            let time = (this.elvArr[i].floorDistance(targetFloor) * 0.5) * 1000 + (this.elvArr[i].finishTime - Date.now());

            if (time < minTime) {
                minTime = time;
                res = i;
            }
        }
        return this.elvArr[res];
    }

    /**
     * Calculates the remaining time before the elevator finishes its current task.
     * @param {Elevator} elv - The elevator.
     * @param {number} originFinishTime - The original finish time.
     * @returns {number} The remaining time in milliseconds.
     */
    private moveTiming(originFinishTime: number): number {
        if (originFinishTime <= Date.now()) {
            return 0;
        }
        return originFinishTime - Date.now();
    }

    /**
     * Sends the selected elevator to the target floor.
     * @param {Elevator} elv - The selected elevator.
     * @param {number} targetFloor - The target floor.
     */
    private sendElv(elv: Elevator, targetFloor: number): void {
        let originFinishTime = elv.TimeAdd(targetFloor);
        let originDestinationFloor = elv.UpDestination(targetFloor);

        let wait = this.moveTiming( originFinishTime);
        setTimeout(() => {
            elv.move(originDestinationFloor, targetFloor);
        }, wait);
        elv.gling();
    }

    /**
     * Checks if the target floor is already in the order queue.
     * @param {number} targetFloor - The target floor.
     * @returns {boolean} True if the order is unique, false otherwise.
     */
    private checkUniqueOrder(targetFloor: number): boolean {
        return !this.elvArr.some(elv => elv.currentDestinationFloor == targetFloor);
    }

    /**
     * Calculates the time it will take for the elevator to finish its current task and reach the target floor.
     * @param {Elevator} elv - The elevator.
     * @param {number} targetFloor - The target floor.
     * @returns {number} The time in seconds.
     */
    private TimeToFinish(elv: Elevator, targetFloor: number): number {
        return elv.floorDistance(targetFloor) * 0.5 + (((elv.finishTime) - Date.now()) / 1000);
    }

    /**
     * Sets a timer for the target floor indicating the estimated arrival time of the elevator.
     * @param {number} targetFloor - The target floor.
     * @param {Floor} floor - The floor object.
     * @param {Elevator} elv - The elevator.
     */
    private sendTimer(targetFloor: number, floor: Floor, elv: Elevator): void {
        let time = this.TimeToFinish(elv, targetFloor);
        floor.setTimer(time);
    }

    /**
     * Handles the elevator order for a given floor.
     * @param {number} targetFloor - The target floor.
     * @param {Floor} floor - The floor object.
     */
    public ElvOrder(targetFloor: number, floor: Floor): void {
        let unique: boolean = this.checkUniqueOrder(targetFloor);
        if (!unique) {
            return;
        }
        let selectedElv: Elevator = this.selectElv(targetFloor); // Select elevator
        this.sendTimer(targetFloor, floor, selectedElv); // Set timer    
        this.sendElv(selectedElv, targetFloor); // Send elevator
    }
}
