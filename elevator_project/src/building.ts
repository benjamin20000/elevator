import { ElevatorSystem } from "./elevator_system";
import { FloorColumn } from "./floor_column";
import { ElevatorConfig } from "./settings";

/**
 * Represents a building with floors and elevators.
 */
export class Building {
    private divElement: HTMLDivElement;
    private elevatorsNum: number = ElevatorConfig.numberOfElevators;
    private floorsNum: number = ElevatorConfig.numberOfFloors;
    private elevators: ElevatorSystem;
    private floors: FloorColumn;

    /**
     * Creates an instance of Building.
     */
    constructor() {
        // Create the main building container
        this.divElement = document.createElement('div');
        this.divElement.className = 'Building';

        // Initialize floors and elevators
        this.floors = new FloorColumn(this.floorsNum, this.handleFloorClick.bind(this));
        this.elevators = new ElevatorSystem(this.elevatorsNum);

        // Append floors and elevators to the building container
        this.divElement.appendChild(this.floors.divElement);
        this.divElement.appendChild(this.elevators.divElement);

        // Append the building container to the document body
        document.body.appendChild(this.divElement);
    }

    /**
     * Handles the click event on a floor.
     * @param targetFloor The target floor number.
     */
    private handleFloorClick = (targetFloor: number) => {
        console.log(`Floor ${targetFloor} clicked`);
        // Pass the floor order to the elevator system
        this.elevators.ElvOrder(targetFloor, this.floors.floorArry[Math.abs(this.floorsNum - targetFloor)]);
    }
}
