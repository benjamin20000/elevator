// import { Floor } from "./floor";
// import { FloorFactory } from "./factories/floor_factory";
// import { Elevator } from "./elevator";
// import { ElevatorFactory } from "./factories/elevator_factory";
// import { ElevatorSistem } from "./elevator_sistem";
// import { FloorColumn } from "./floor_column";
// import { Building } from "./building";
import { BuildingFactory } from "./factories/building_factory";
import { ElevatorConfig } from "./settings";

/**
 * The main function to initialize and create buildings with elevators.
 */
function main() {
    const buildingFactory = new BuildingFactory();
    
    // Loop through the number of buildings specified in the configuration
    for (let i = 0; i < ElevatorConfig.numberOfBuildings; i++) {
        buildingFactory.createBuilding();
    }
}



// Run the main function
main();
