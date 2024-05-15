// import Config from './config';

class Floor {
    public divElement: HTMLDivElement;

    constructor(floorNum: number, onClick: (floorNum: number) => void) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'floor';

        const blackLine = document.createElement('div');
        blackLine.className = 'blackline';
        this.divElement.appendChild(blackLine);

        const button = document.createElement('button');
        button.className = 'metal linear';
        button.textContent = `${floorNum}`;
        button.addEventListener('click', () => onClick(floorNum)); // Add event listener
        this.divElement.appendChild(button);
    }
}

class Elevator {
    public divElement: HTMLDivElement;
    public elevatorImg:HTMLImageElement;
    public curentDestinationFloor: number = 0;
    public active: boolean = false;
    public finishTime: number = 0; 
    private  audio = new Audio('music/ding.mp3');

    constructor(elvNum: number) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'elevator';

        this.elevatorImg = document.createElement('img');
        this.elevatorImg.src = 'images/elv.png';
        this.divElement.appendChild(this.elevatorImg);

       
    }


    private speedCalcul(origin: number, targetFloor: number){
        return Math.abs(origin - targetFloor) * 0.5;
    }

    
    private targetCalcul(targetFloor: number){
        return -targetFloor * 110;
    }


    public UpDestination(targetFloor){
        let originDestinationFloor = this.curentDestinationFloor;
        this.curentDestinationFloor = targetFloor; 
        return originDestinationFloor;
    }

    private gling() {
        setTimeout(() => {
            this.audio.play();
        }, this.finishTime - Date.now()- 2000);
    }
    
    public move(origin: number, targetFloor: number) {
        let speed = this.speedCalcul(origin, targetFloor);
        let target = this.targetCalcul(targetFloor);


        this.divElement.style.transition = `transform ${speed}s ease`;
        this.divElement.style.transform = `translateY(${target}px)`;

        this.gling()
    }


    public floorDistance(newFloor:number){
        return Math.abs(this.curentDestinationFloor - newFloor);
    }


    public TimeUpdate(){
        if (this.finishTime < Date.now()){
            this.finishTime = Date.now();
        }
    }


    public TimeAdd(targetFloor: number){
        this.TimeUpdate();
        let addTime = this.floorDistance(targetFloor)*0.5 + 2;
        this.finishTime += addTime*1000;
        return  this.finishTime - addTime*1000;
    }
}




class ElevatorShaft {
    public divElement: HTMLDivElement;
    public elvArr: Elevator[] = [];
    public orderQueue: number[] = [];


    constructor(elvNum: number){
        this.divElement = document.createElement('div');
        this.divElement.className = 'ElevatorShaft';

        for (let i = 0; i < elvNum; i++){
            const elevator = new Elevator(elvNum);
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

            console.log(i ,":  time" ,time)
            if (time < minTime){
                minTime = time
                res = i;
            }
        }
        console.log("res" ,this.elvArr.length)
        return res;
    }

    

    private moveTiming(elv: Elevator, originFinishTime){

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

    }


    public ElvOrder(targetFloor: number){
        let select: number = this.selectElv(targetFloor) //select
        this.sendElv(this.elvArr[select], targetFloor) //send
    }
}



class FloorColumn {
    public divElement: HTMLDivElement;

    constructor(floors: number, onClick: (floornum: number) => void) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'FloorColumn';
        for(let i = floors; i >= 0; i--){   
            const floor = new Floor(i, onClick);
            this.divElement.appendChild(floor.divElement);
        }
    }
}



class Building {
    private divElement: HTMLDivElement;
    private elevators: ElevatorShaft;

    constructor() {
        this.divElement = document.createElement('div');
        this.divElement.className = 'Building';

        const floors = new FloorColumn(15, this.handleFloorClick.bind(this));
        const elevatorColumn = new ElevatorShaft(3);
        this.elevators = elevatorColumn; // Assign elevatorColumn to the property

        this.divElement.appendChild(floors.divElement); 
        this.divElement.appendChild(elevatorColumn.divElement);

        document.body.appendChild(this.divElement);
    }   

    private handleFloorClick = (targetFoor: number) => {

        console.log(`Floor ${targetFoor} clicked`);
        this.elevators.orderQueue.push(targetFoor);
        this.elevators.ElvOrder(targetFoor);

    }
}



const b = new Building;