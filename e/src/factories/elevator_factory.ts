import { Elevator } from "../elevator";


// Elevator factory
export class ElevatorFactory {
    public createElevator(): Elevator {
        return new Elevator();
    }
}