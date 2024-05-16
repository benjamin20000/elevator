// import { Floor } from "./floor";
// import { FloorFactory } from "./factories/floor_factory";
// import { Elevator } from "./elevator";
// import { ElevatorFactory } from "./factories/elevator_factory";
// import { ElevatorSistem } from "./elevator_sistem";
// import { FloorColumn } from "./floor_column";
// import { Building } from "./building";
import{ BuildingFactory} from "./factories/building_factory"
import {ElevatorConfig} from "./settings"



function main(){
    const buildingFactory = new BuildingFactory()
    for(let i = 0; i < ElevatorConfig.numberOfBuildings; i++){
        buildingFactory.createBuilding();
    }
}

main();
