import { Elevator } from "./elevator";
import { ElevatorFactory } from "./factories/elevator_factory";
import { Floor } from "./floor";

export class ElevatorSistem {
    public divElement: HTMLDivElement;
    public elvArr: Elevator[] = [];
    public orderQueue: number[] = [];


    constructor(elvNum: number){
        this.divElement = document.createElement('div');
        this.divElement.className = 'ElevatorShaft';
        const elevatorFactory = new ElevatorFactory();

        for (let i = 0; i < elvNum; i++){
            const elevator = elevatorFactory.createElevator();
            this.elvArr.push(elevator); // Push elevator into arr
            this.divElement.appendChild(elevator.divElement);
        }
    }


    private selectElv(targetFloor: number){
        let minTime: number = Infinity;
        let res: number = 0;
    
        for(let i = 0; i < this.elvArr.length; i++){
            
            this.elvArr[i].TimeUpdate();
            let time = (this.elvArr[i].floorDistance(targetFloor)*0.5)*1000 + (this.elvArr[i].finishTime - Date.now());

            if (time < minTime){
                minTime = time
                res = i;
            }
        }
        return this.elvArr[res];
    }

    

    private moveTiming(elv: Elevator, originFinishTime: number){

        if((originFinishTime <= Date.now())){      
            return 0;
        }
        return originFinishTime - Date.now();
    }



    private sendElv(elv: Elevator, targetFloor: number){
        let originFinishTime =  elv.TimeAdd(targetFloor);
        let originDestinationFloor = elv.UpDestination(targetFloor)

        let waite = this.moveTiming(elv, originFinishTime)
        setTimeout(() => {
            elv.move(originDestinationFloor, targetFloor);
        },waite);
        elv.gling();
    }

    private checkUniqueOrder(targetFloor: number): boolean {
        return !this.elvArr.some(elv => elv.currentDestinationFloor == targetFloor);
    }
    

    private TimeToFinish(elv:Elevator, targetFloor: number){
        return elv.floorDistance(targetFloor)*0.5 + (((elv.finishTime) - Date.now())/1000);
    }

    private sendTimer(targetFloor: number, floor: Floor ,elv: Elevator){
         let time = this.TimeToFinish(elv, targetFloor)
         floor.setTimer(time);
        
    }
    public ElvOrder(targetFloor: number, floor: Floor){
        let unique: boolean = this.checkUniqueOrder(targetFloor);
        if(!unique){
            return;
        }
        let selectdElv: Elevator = this.selectElv(targetFloor) //select
        this.sendTimer(targetFloor, floor, selectdElv) //setTimer    
        this.sendElv(selectdElv, targetFloor) //send
    }
}