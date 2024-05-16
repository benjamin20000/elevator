/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/building.ts":
/*!*************************!*\
  !*** ./src/building.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Building = void 0;\nconst elevator_sistem_1 = __webpack_require__(/*! ./elevator_sistem */ \"./src/elevator_sistem.ts\");\nconst floor_column_1 = __webpack_require__(/*! ./floor_column */ \"./src/floor_column.ts\");\nconst settings_1 = __webpack_require__(/*! ./settings */ \"./src/settings.ts\");\n/**\n * Represents a building with floors and elevators.\n */\nclass Building {\n    /**\n     * Creates an instance of Building.\n     */\n    constructor() {\n        this.elevatorsNum = settings_1.ElevatorConfig.numberOfElevators;\n        this.floorsNum = settings_1.ElevatorConfig.numberOfFloors;\n        /**\n         * Handles the click event on a floor.\n         * @param targetFloor The target floor number.\n         */\n        this.handleFloorClick = (targetFloor) => {\n            console.log(`Floor ${targetFloor} clicked`);\n            // Pass the floor order to the elevator system\n            this.elevators.ElvOrder(targetFloor, this.floors.floorArry[Math.abs(this.floorsNum - targetFloor)]);\n        };\n        // Create the main building container\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'Building';\n        // Initialize floors and elevators\n        this.floors = new floor_column_1.FloorColumn(this.floorsNum, this.handleFloorClick.bind(this));\n        this.elevators = new elevator_sistem_1.ElevatorSistem(this.elevatorsNum);\n        // Append floors and elevators to the building container\n        this.divElement.appendChild(this.floors.divElement);\n        this.divElement.appendChild(this.elevators.divElement);\n        // Append the building container to the document body\n        document.body.appendChild(this.divElement);\n    }\n}\nexports.Building = Building;\n\n\n//# sourceURL=webpack://e/./src/building.ts?");

/***/ }),

/***/ "./src/elevator.ts":
/*!*************************!*\
  !*** ./src/elevator.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Elevator = void 0;\n// Concrete implementation of Elevator\nclass Elevator {\n    constructor() {\n        this.currentDestinationFloor = 0;\n        this.active = false;\n        this.finishTime = 0;\n        this.audio = new Audio('../music/ding.mp3');\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'elevator';\n        this.elevatorImg = document.createElement('img');\n        this.elevatorImg.src = '../images/elv.png';\n        this.divElement.appendChild(this.elevatorImg);\n    }\n    speedCalcul(origin, targetFloor) {\n        return Math.abs(origin - targetFloor) * 0.5;\n    }\n    targetCalcul(targetFloor) {\n        return -targetFloor * 110;\n    }\n    UpDestination(targetFloor) {\n        let originDestinationFloor = this.currentDestinationFloor;\n        this.currentDestinationFloor = targetFloor;\n        return originDestinationFloor;\n    }\n    gling() {\n        setTimeout(() => {\n            this.audio.play();\n            console.log(\"ffff\", this.finishTime - Date.now());\n        }, (this.finishTime - Date.now() - 2000));\n    }\n    move(origin, targetFloor) {\n        let speed = this.speedCalcul(origin, targetFloor);\n        let target = this.targetCalcul(targetFloor);\n        this.divElement.style.transition = `transform ${speed}s ease`;\n        this.divElement.style.transform = `translateY(${target}px)`;\n    }\n    floorDistance(newFloor) {\n        return Math.abs(this.currentDestinationFloor - newFloor);\n    }\n    TimeUpdate() {\n        if (this.finishTime < Date.now()) {\n            this.finishTime = Date.now();\n        }\n    }\n    TimeAdd(targetFloor) {\n        this.TimeUpdate();\n        let addTime = this.floorDistance(targetFloor) * 0.5 + 2;\n        this.finishTime += addTime * 1000;\n        return this.finishTime - addTime * 1000;\n    }\n}\nexports.Elevator = Elevator;\n\n\n//# sourceURL=webpack://e/./src/elevator.ts?");

/***/ }),

/***/ "./src/elevator_sistem.ts":
/*!********************************!*\
  !*** ./src/elevator_sistem.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ElevatorSistem = void 0;\nconst elevator_factory_1 = __webpack_require__(/*! ./factories/elevator_factory */ \"./src/factories/elevator_factory.ts\");\nclass ElevatorSistem {\n    constructor(elvNum) {\n        this.elvArr = [];\n        this.orderQueue = [];\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'ElevatorShaft';\n        const elevatorFactory = new elevator_factory_1.ElevatorFactory();\n        for (let i = 0; i < elvNum; i++) {\n            const elevator = elevatorFactory.createElevator();\n            this.elvArr.push(elevator); // Push elevator into arr\n            this.divElement.appendChild(elevator.divElement);\n        }\n    }\n    selectElv(targetFloor) {\n        let minTime = Infinity;\n        let res = 0;\n        for (let i = 0; i < this.elvArr.length; i++) {\n            this.elvArr[i].TimeUpdate();\n            let time = (this.elvArr[i].floorDistance(targetFloor) * 0.5) * 1000 + (this.elvArr[i].finishTime - Date.now());\n            if (time < minTime) {\n                minTime = time;\n                res = i;\n            }\n        }\n        return this.elvArr[res];\n    }\n    moveTiming(elv, originFinishTime) {\n        if ((originFinishTime <= Date.now())) {\n            return 0;\n        }\n        return originFinishTime - Date.now();\n    }\n    sendElv(elv, targetFloor) {\n        let originFinishTime = elv.TimeAdd(targetFloor);\n        let originDestinationFloor = elv.UpDestination(targetFloor);\n        let waite = this.moveTiming(elv, originFinishTime);\n        setTimeout(() => {\n            elv.move(originDestinationFloor, targetFloor);\n        }, waite);\n        elv.gling();\n    }\n    checkUniqueOrder(targetFloor) {\n        return !this.elvArr.some(elv => elv.currentDestinationFloor == targetFloor);\n    }\n    TimeToFinish(elv, targetFloor) {\n        return elv.floorDistance(targetFloor) * 0.5 + (((elv.finishTime) - Date.now()) / 1000);\n    }\n    sendTimer(targetFloor, floor, elv) {\n        let time = this.TimeToFinish(elv, targetFloor);\n        floor.setTimer(time);\n    }\n    ElvOrder(targetFloor, floor) {\n        let unique = this.checkUniqueOrder(targetFloor);\n        if (!unique) {\n            return;\n        }\n        let selectdElv = this.selectElv(targetFloor); //select\n        this.sendTimer(targetFloor, floor, selectdElv); //setTimer    \n        this.sendElv(selectdElv, targetFloor); //send\n    }\n}\nexports.ElevatorSistem = ElevatorSistem;\n\n\n//# sourceURL=webpack://e/./src/elevator_sistem.ts?");

/***/ }),

/***/ "./src/factories/building_factory.ts":
/*!*******************************************!*\
  !*** ./src/factories/building_factory.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BuildingFactory = void 0;\nconst building_1 = __webpack_require__(/*! ../building */ \"./src/building.ts\");\n// Building factory\nclass BuildingFactory {\n    createBuilding() {\n        return new building_1.Building();\n    }\n}\nexports.BuildingFactory = BuildingFactory;\n\n\n//# sourceURL=webpack://e/./src/factories/building_factory.ts?");

/***/ }),

/***/ "./src/factories/elevator_factory.ts":
/*!*******************************************!*\
  !*** ./src/factories/elevator_factory.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ElevatorFactory = void 0;\nconst elevator_1 = __webpack_require__(/*! ../elevator */ \"./src/elevator.ts\");\n// Elevator factory\nclass ElevatorFactory {\n    createElevator() {\n        return new elevator_1.Elevator();\n    }\n}\nexports.ElevatorFactory = ElevatorFactory;\n\n\n//# sourceURL=webpack://e/./src/factories/elevator_factory.ts?");

/***/ }),

/***/ "./src/factories/floor_factory.ts":
/*!****************************************!*\
  !*** ./src/factories/floor_factory.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.FloorFactory = void 0;\nconst floor_1 = __webpack_require__(/*! ../floor */ \"./src/floor.ts\");\n// Floor factory\nclass FloorFactory {\n    createFloor(floorNum, onClick) {\n        return new floor_1.Floor(floorNum, onClick);\n    }\n}\nexports.FloorFactory = FloorFactory;\n\n\n//# sourceURL=webpack://e/./src/factories/floor_factory.ts?");

/***/ }),

/***/ "./src/floor.ts":
/*!**********************!*\
  !*** ./src/floor.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Floor = void 0;\nconst timer_1 = __webpack_require__(/*! ./timer */ \"./src/timer.ts\");\n// Concrete implementation of Floor\nclass Floor {\n    constructor(floorNum, onClick) {\n        this.screen = new timer_1.TimScreen();\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'floor';\n        this.addBlackLine();\n        this.addButton(floorNum, onClick);\n        this.addScreen();\n    }\n    addBlackLine() {\n        const blackLine = document.createElement('div');\n        blackLine.className = 'blackline';\n        this.divElement.appendChild(blackLine);\n    }\n    addButton(floorNum, onClick) {\n        const button = document.createElement('button');\n        button.className = 'metal linear';\n        button.textContent = `${floorNum}`;\n        button.addEventListener('click', () => onClick(floorNum));\n        this.divElement.appendChild(button);\n    }\n    addScreen() {\n        this.divElement.appendChild(this.screen.divElement);\n    }\n    setTimer(time) {\n        this.screen.timer(time);\n    }\n}\nexports.Floor = Floor;\n\n\n//# sourceURL=webpack://e/./src/floor.ts?");

/***/ }),

/***/ "./src/floor_column.ts":
/*!*****************************!*\
  !*** ./src/floor_column.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.FloorColumn = void 0;\nconst floor_factory_1 = __webpack_require__(/*! ./factories/floor_factory */ \"./src/factories/floor_factory.ts\");\nclass FloorColumn {\n    constructor(floors, onClick) {\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'FloorColumn';\n        const floorFactory = new floor_factory_1.FloorFactory();\n        this.floorArry = [];\n        for (let i = floors; i >= 0; i--) {\n            const floor = floorFactory.createFloor(i, onClick);\n            this.floorArry.push(floor); //this line make the bulding\n            this.divElement.appendChild(floor.divElement);\n        }\n    }\n}\nexports.FloorColumn = FloorColumn;\n\n\n//# sourceURL=webpack://e/./src/floor_column.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n// import { Floor } from \"./floor\";\n// import { FloorFactory } from \"./factories/floor_factory\";\n// import { Elevator } from \"./elevator\";\n// import { ElevatorFactory } from \"./factories/elevator_factory\";\n// import { ElevatorSistem } from \"./elevator_sistem\";\n// import { FloorColumn } from \"./floor_column\";\n// import { Building } from \"./building\";\nconst building_factory_1 = __webpack_require__(/*! ./factories/building_factory */ \"./src/factories/building_factory.ts\");\nconst settings_1 = __webpack_require__(/*! ./settings */ \"./src/settings.ts\");\nfunction main() {\n    const buildingFactory = new building_factory_1.BuildingFactory();\n    for (let i = 0; i < settings_1.ElevatorConfig.numberOfBuildings; i++) {\n        buildingFactory.createBuilding();\n    }\n}\nmain();\n\n\n//# sourceURL=webpack://e/./src/index.ts?");

/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ElevatorConfig = void 0;\nexports.ElevatorConfig = {\n    numberOfBuildings: 3,\n    numberOfFloors: 15,\n    numberOfElevators: 3,\n};\nexports[\"default\"] = exports.ElevatorConfig;\n\n\n//# sourceURL=webpack://e/./src/settings.ts?");

/***/ }),

/***/ "./src/timer.ts":
/*!**********************!*\
  !*** ./src/timer.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TimScreen = void 0;\nclass TimScreen {\n    constructor() {\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'screen';\n    }\n    timer(time) {\n        const startTime = performance.now();\n        const updateDisplay = () => {\n            const elapsedTime = performance.now() - startTime;\n            const remainingTime = time - elapsedTime / 1000; // Convert milliseconds to seconds\n            if (remainingTime <= 0) {\n                clearInterval(countdown);\n                this.divElement.textContent = \"\";\n            }\n            else {\n                this.divElement.textContent = String(remainingTime.toFixed(1)); // Display remaining time with one decimal place\n            }\n        };\n        updateDisplay(); // Call updateDisplay immediately to avoid initial delay\n        const countdown = setInterval(updateDisplay, 500); // Update every 500 milliseconds\n    }\n}\nexports.TimScreen = TimScreen;\n\n\n//# sourceURL=webpack://e/./src/timer.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;