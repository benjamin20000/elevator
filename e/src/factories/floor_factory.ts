import { Floor } from "../floor";

// Floor factory
export class FloorFactory {
    public createFloor(floorNum: number, onClick: (floorNum: number) => void): Floor {
        return new Floor(floorNum, onClick);
    }
}