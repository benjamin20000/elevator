// import Config from './config';
var Floor = /** @class */ (function () {
    function Floor(floorNum, onClick) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'floor';
        var blackLine = document.createElement('div');
        blackLine.className = 'blackline';
        this.divElement.appendChild(blackLine);
        var button = document.createElement('button');
        button.className = 'metal linear';
        button.textContent = "".concat(floorNum);
        button.addEventListener('click', function () { return onClick(floorNum); }); // Add event listener
        this.divElement.appendChild(button);
    }
    return Floor;
}());
var Elevator = /** @class */ (function () {
    function Elevator(elvNum) {
        this.destination = 0;
        // public active: boolean = false;
        this.finishTim = 0;
        this.divElement = document.createElement('div');
        this.divElement.className = 'elevator';
        this.elevatorImg = document.createElement('img');
        this.elevatorImg.src = 'images/elv.png';
        this.divElement.appendChild(this.elevatorImg);
    }
    Elevator.prototype.speedCalcul = function (targetFloor) {
        return Math.abs(this.destination - targetFloor) * 0.5;
    };
    Elevator.prototype.targetCalcul = function (targetFloor) {
        return -targetFloor * 110;
    };
    Elevator.prototype.move = function (targetFloor) {
        var speed = this.speedCalcul(targetFloor);
        var target = this.targetCalcul(targetFloor);
        this.divElement.style.transition = "transform ".concat(speed, "s ease");
        this.divElement.style.transform = "translateY(".concat(target, "px)");
    };
    return Elevator;
}());
var order = /** @class */ (function () {
    function order(target, finishTim) {
        this.startTim = Date.now();
        this.finishTim = finishTim;
        this.target = target;
    }
    return order;
}());
var ElevatorShaft = /** @class */ (function () {
    // private elvAvailable = true
    function ElevatorShaft(elvNum) {
        this.elvArr = [];
        this.orderQueue = [];
        this.divElement = document.createElement('div');
        this.divElement.className = 'ElevatorShaft';
        for (var i = 0; i < elvNum; i++) {
            var elevator = new Elevator(elvNum);
            this.elvArr.push(elevator); // Push elevator into arr
            this.divElement.appendChild(elevator.divElement);
        }
    }
    ElevatorShaft.prototype.ElvOrder = function (targetFloor) {
        var theElev = this.elvArr[0];
        var minTim = this.elvArr[0].finishTim + Math.abs(theElev.destination - targetFloor) * 0.5;
        this.elvArr.forEach(function (elev) {
            var elvTim = theElev.finishTim + Math.abs(elev.destination - targetFloor) * 0.5;
            if (elvTim <= minTim) {
                theElev = elev;
                minTim = elvTim;
            }
        });
        theElev.finishTim = +Math.abs(targetFloor - theElev.destination) * 0.5;
        theElev.destination = targetFloor;
        setTimeout(function () {
            theElev.move(targetFloor);
        }, minTim);
    };
    return ElevatorShaft;
}());
var FloorColumn = /** @class */ (function () {
    function FloorColumn(floors, onClick) {
        this.divElement = document.createElement('div');
        this.divElement.className = 'FloorColumn';
        for (var i = floors; i >= 0; i--) {
            var floor = new Floor(i, onClick);
            this.divElement.appendChild(floor.divElement);
        }
    }
    return FloorColumn;
}());
var Building = /** @class */ (function () {
    function Building() {
        var _this = this;
        this.handleFloorClick = function (targetFoor) {
            console.log("Floor ".concat(targetFoor, " clicked"));
            // this.elevators.orderQueue.push(targetFoor);
            _this.elevators.ElvOrder(targetFoor);
        };
        this.divElement = document.createElement('div');
        this.divElement.className = 'Building';
        var floors = new FloorColumn(15, this.handleFloorClick.bind(this));
        var elevatorColumn = new ElevatorShaft(3);
        this.elevators = elevatorColumn; // Assign elevatorColumn to the property
        this.divElement.appendChild(floors.divElement);
        this.divElement.appendChild(elevatorColumn.divElement);
        document.body.appendChild(this.divElement);
    }
    return Building;
}());
var b = new Building;
