
import { TimScreen } from "./timer";
// Concrete implementation of Floor
export class Floor  {
    public divElement: HTMLDivElement;
    private screen = new TimScreen();

    constructor(floorNum: number, onClick: (floorNum: number) => void) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'floor';

        this.addBlackLine();
        this.addButton(floorNum, onClick);
        this.addScreen();
    }

    private addBlackLine() {
        const blackLine = document.createElement('div');
        blackLine.className = 'blackline';
        this.divElement.appendChild(blackLine);
    }

    private addButton(floorNum: number, onClick: (floorNum: number) => void) {
        const button = document.createElement('button');
        button.className = 'metal linear';
        button.textContent = `${floorNum}`;
        button.addEventListener('click', () => onClick(floorNum));
        this.divElement.appendChild(button);
    }

    private addScreen(){
        this.divElement.appendChild(this.screen.divElement);
    }
    
    public setTimer(time: number){
        this.screen.timer(time);
    }
}
