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
    public destination: number = 0;
    // public active: boolean = false;
    public finishTim: number = 0; 

    constructor(elvNum: number) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'elevator';

        this.elevatorImg = document.createElement('img');
        this.elevatorImg.src = 'images/elv.png';
        this.divElement.appendChild(this.elevatorImg);
    }

    private speedCalcul(targetFloor: number){
        return Math.abs(this.destination - targetFloor) * 0.5;
    }

    
    private targetCalcul(targetFloor: number){
        return -targetFloor * 110;
    }


    public move(targetFloor: number) {
        let speed = this.speedCalcul(targetFloor);
        let target = this.targetCalcul(targetFloor);


        this.divElement.style.transition = `transform ${speed}s ease`;
        this.divElement.style.transform = `translateY(${target}px)`; 
    }

}


class order {
    startTim: number;
    finishTim: number;
    target: number; // floor
    constructor(target: number, finishTim: number){
        this.startTim =  Date.now();
        this.finishTim = finishTim;
        this.target = target;
    }
}


class ElevatorShaft {
    public divElement: HTMLDivElement;
    public elvArr: Elevator[] = [];
    public orderQueue: order[] = [];
    // private elvAvailable = true


    constructor(elvNum: number){
        this.divElement = document.createElement('div');
        this.divElement.className = 'ElevatorShaft';

        for (let i = 0; i < elvNum; i++){
            const elevator = new Elevator(elvNum);
            this.elvArr.push(elevator); // Push elevator into arr
            this.divElement.appendChild(elevator.divElement);
        }
    }

    


    public ElvOrder(targetFloor: number){


        let theElev: Elevator = this.elvArr[0]; 
        let minTim: number = this.elvArr[0].finishTim + Math.abs(theElev.destination - targetFloor)*0.5;
        this.elvArr.forEach(elev => {
            let elvTim = theElev.finishTim + Math.abs(elev.destination - targetFloor)*0.5;
            if (elvTim <= minTim){
                theElev = elev;
                minTim = elvTim;
                }   
        });
        theElev.finishTim =+ Math.abs(targetFloor - theElev.destination)*0.5;
        theElev.destination = targetFloor;
        setTimeout(() => {
            theElev.move(targetFloor) 
        }, minTim); 
        
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
        // this.elevators.orderQueue.push(targetFoor);
        this.elevators.ElvOrder(targetFoor);
    }
}



const b = new Building;