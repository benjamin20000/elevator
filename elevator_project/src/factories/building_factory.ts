import { Building } from "../building";


// Building factory
export class BuildingFactory {
    public createBuilding(): Building {
        return new Building();
    }
}