import { Floor } from "./floor";
import { FloorFactory } from "./factories/floor_factory";




export class FloorColumn {
    public divElement: HTMLDivElement;
    public floorArry :Floor[];

    constructor(floors: number, onClick: (floornum: number) => void) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'FloorColumn';
        const floorFactory = new FloorFactory();
        this.floorArry = [];
        for(let i = floors; i >= 0; i--){   
            const floor= floorFactory.createFloor(i, onClick);
            this.floorArry.push(floor); //this line make the bulding
            this.divElement.appendChild(floor.divElement);
        }
    }
}