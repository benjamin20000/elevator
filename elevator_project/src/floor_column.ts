import { Floor } from "./floor";
import { FloorFactory } from "./factories/floor_factory";

/**
 * Class representing a column of floors in a building.
 */
export class FloorColumn {
    /** The HTML div element representing the column of floors. */
    public divElement: HTMLDivElement;
    /** Array of Floor objects. */
    public floorArry: Floor[];

    /**
     * Creates an instance of FloorColumn.
     * @param {number} floors - The number of floors in the building.
     * @param {(floornum: number) => void} onClick - The callback function to handle floor button clicks.
     */
    constructor(floors: number, onClick: (floornum: number) => void) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'FloorColumn';
        const floorFactory = new FloorFactory();
        this.floorArry = [];
        
        for (let i = floors; i >= 0; i--) {
            const floor = floorFactory.createFloor(i, onClick);
            this.floorArry.push(floor); // Add floor to the array
            this.divElement.appendChild(floor.divElement);
        }
    }
}
