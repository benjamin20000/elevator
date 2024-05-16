
export class Elevator {
    public divElement: HTMLDivElement;
    public elevatorImg:HTMLImageElement;
    public currentDestinationFloor: number = 0;
    public active: boolean = false;
    public finishTime: number = 0; 
    private  audio = new Audio('../music/ding.mp3');

    constructor() {
        this.divElement = document.createElement('div');
        this.divElement.className = 'elevator';

        this.elevatorImg = document.createElement('img');
        this.elevatorImg.src = '../images/elv.png';
        this.divElement.appendChild(this.elevatorImg);
    }

    private speedCalcul(origin: number, targetFloor: number){
        return Math.abs(origin - targetFloor) * 0.5;
    }

    
    private targetCalcul(targetFloor: number){
        return -targetFloor * 110;
    }


    public UpDestination(targetFloor: number){
        let originDestinationFloor = this.currentDestinationFloor;
        this.currentDestinationFloor = targetFloor; 
        return originDestinationFloor;
    }

    public gling() {
        setTimeout(() => {
            this.audio.play();
        }, (this.finishTime - Date.now() - 2000));
    }
    
    public move(origin: number, targetFloor: number) {
        let speed = this.speedCalcul(origin, targetFloor);
        let target = this.targetCalcul(targetFloor);

        this.divElement.style.transition = `transform ${speed}s ease`;
        this.divElement.style.transform = `translateY(${target}px)`;

    }


    public floorDistance(newFloor:number){
        return Math.abs(this.currentDestinationFloor - newFloor);
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
