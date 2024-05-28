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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Building = void 0;\nconst elevator_sistem_1 = __webpack_require__(/*! ./elevator_sistem */ \"./src/elevator_sistem.ts\");\nconst floor_column_1 = __webpack_require__(/*! ./floor_column */ \"./src/floor_column.ts\");\nconst settings_1 = __webpack_require__(/*! ./settings */ \"./src/settings.ts\");\n/**\n * Represents a building with floors and elevators.\n */\nclass Building {\n    /**\n     * Creates an instance of Building.\n     */\n    constructor() {\n        this.elevatorsNum = settings_1.ElevatorConfig.numberOfElevators;\n        this.floorsNum = settings_1.ElevatorConfig.numberOfFloors;\n        /**\n         * Handles the click event on a floor.\n         * @param targetFloor The target floor number.\n         */\n        this.handleFloorClick = (targetFloor) => {\n            console.log(`Floor ${targetFloor} clicked`);\n            // Pass the floor order to the elevator system\n            this.elevators.ElvOrder(targetFloor, this.floors.floorArry[Math.abs(this.floorsNum - targetFloor)]);\n        };\n        // Create the main building container\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'Building';\n        // Initialize floors and elevators\n        this.floors = new floor_column_1.FloorColumn(this.floorsNum, this.handleFloorClick.bind(this));\n        this.elevators = new elevator_sistem_1.ElevatorSystem(this.elevatorsNum);\n        // Append floors and elevators to the building container\n        this.divElement.appendChild(this.floors.divElement);\n        this.divElement.appendChild(this.elevators.divElement);\n        // Append the building container to the document body\n        document.body.appendChild(this.divElement);\n    }\n}\nexports.Building = Building;\n\n\n//# sourceURL=webpack://e/./src/building.ts?");

/***/ }),

/***/ "./src/elevator.ts":
/*!*************************!*\
  !*** ./src/elevator.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Elevator = void 0;\n/**\n * Class representing an Elevator.\n */\nclass Elevator {\n    /**\n     * Creates an instance of Elevator.\n     */\n    constructor() {\n        /** The current destination floor of the elevator. */\n        this.currentDestinationFloor = 0;\n        /** The finish time of the elevator's current task. */\n        this.finishTime = 0;\n        /** The audio object for playing a sound when the elevator arrives. */\n        this.audio = new Audio('../music/ding.mp3');\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'elevator';\n        this.elevatorImg = document.createElement('img');\n        this.elevatorImg.src = '../images/elv.png';\n        this.divElement.appendChild(this.elevatorImg);\n    }\n    /**\n     * Calculates the speed required to move between floors.\n     * @param {number} origin - The current floor.\n     * @param {number} targetFloor - The target floor.\n     * @returns {number} The calculated speed.\n     */\n    speedCalcul(origin, targetFloor) {\n        return Math.abs(origin - targetFloor) * 0.5;\n    }\n    /**\n     * Calculates the target position for the elevator.\n     * @param {number} targetFloor - The target floor.\n     * @returns {number} The calculated target position.\n     */\n    targetCalcul(targetFloor) {\n        return -targetFloor * 110;\n    }\n    /**\n     * Updates the current destination floor and returns the previous destination floor.\n     * @param {number} targetFloor - The new target floor.\n     * @returns {number} The previous destination floor.\n     */\n    UpDestination(targetFloor) {\n        let originDestinationFloor = this.currentDestinationFloor;\n        this.currentDestinationFloor = targetFloor;\n        return originDestinationFloor;\n    }\n    /**\n     * Plays a sound when the elevator arrives at the target floor.\n     */\n    gling() {\n        setTimeout(() => {\n            this.audio.play();\n        }, (this.finishTime - Date.now() - 2000));\n    }\n    /**\n     * Moves the elevator to the target floor.\n     * @param {number} origin - The current floor.\n     * @param {number} targetFloor - The target floor.\n     */\n    move(origin, targetFloor) {\n        let speed = this.speedCalcul(origin, targetFloor);\n        let target = this.targetCalcul(targetFloor);\n        this.divElement.style.transition = `transform ${speed}s ease`;\n        this.divElement.style.transform = `translateY(${target}px)`;\n    }\n    /**\n     * Calculates the distance between the current floor and a new floor.\n     * @param {number} newFloor - The new floor.\n     * @returns {number} The floor distance.\n     */\n    floorDistance(newFloor) {\n        return Math.abs(this.currentDestinationFloor - newFloor);\n    }\n    /**\n     * Updates the finish time to the current time if it has already passed.\n     */\n    TimeUpdate() {\n        if (this.finishTime < Date.now()) {\n            this.finishTime = Date.now();\n        }\n    }\n    /**\n     * Adds the time required to reach the target floor to the finish time.\n     * @param {number} targetFloor - The target floor.\n     * @returns {number} The original finish time before adding the new time.\n     */\n    TimeAdd(targetFloor) {\n        this.TimeUpdate();\n        let addTime = this.floorDistance(targetFloor) * 0.5 + 2;\n        this.finishTime += addTime * 1000;\n        return this.finishTime - addTime * 1000;\n    }\n}\nexports.Elevator = Elevator;\n\n\n//# sourceURL=webpack://e/./src/elevator.ts?");

/***/ }),

/***/ "./src/elevator_sistem.ts":
/*!********************************!*\
  !*** ./src/elevator_sistem.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ElevatorSystem = void 0;\nconst elevator_factory_1 = __webpack_require__(/*! ./factories/elevator_factory */ \"./src/factories/elevator_factory.ts\");\n/**\n * Class representing an Elevator System.\n */\nclass ElevatorSystem {\n    /**\n     * Creates an instance of ElevatorSystem.\n     * @param {number} elvNum - The number of elevators.\n     */\n    constructor(elvNum) {\n        /** Array of Elevator objects. */\n        this.elvArr = [];\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'ElevatorShaft';\n        const elevatorFactory = new elevator_factory_1.ElevatorFactory();\n        for (let i = 0; i < elvNum; i++) {\n            const elevator = elevatorFactory.createElevator();\n            this.elvArr.push(elevator); // Push elevator into array\n            this.divElement.appendChild(elevator.divElement);\n        }\n    }\n    /**\n     * Selects the most suitable elevator for the given target floor.\n     * @param {number} targetFloor - The floor where the elevator is needed.\n     * @returns {Elevator} The selected elevator.\n     */\n    selectElv(targetFloor) {\n        let minTime = Infinity;\n        let res = 0;\n        for (let i = 0; i < this.elvArr.length; i++) {\n            this.elvArr[i].TimeUpdate();\n            let time = (this.elvArr[i].floorDistance(targetFloor) * 0.5) * 1000 + (this.elvArr[i].finishTime - Date.now());\n            if (time < minTime) {\n                minTime = time;\n                res = i;\n            }\n        }\n        return this.elvArr[res];\n    }\n    /**\n     * Calculates the remaining time before the elevator finishes its current task.\n     * @param {Elevator} elv - The elevator.\n     * @param {number} originFinishTime - The original finish time.\n     * @returns {number} The remaining time in milliseconds.\n     */\n    moveTiming(originFinishTime) {\n        if (originFinishTime <= Date.now()) {\n            return 0;\n        }\n        return originFinishTime - Date.now();\n    }\n    /**\n     * Sends the selected elevator to the target floor.\n     * @param {Elevator} elv - The selected elevator.\n     * @param {number} targetFloor - The target floor.\n     */\n    sendElv(elv, targetFloor) {\n        let originFinishTime = elv.TimeAdd(targetFloor);\n        let originDestinationFloor = elv.UpDestination(targetFloor);\n        let wait = this.moveTiming(originFinishTime);\n        setTimeout(() => {\n            elv.move(originDestinationFloor, targetFloor);\n        }, wait);\n        elv.gling();\n    }\n    /**\n     * Checks if the target floor is already in the order queue.\n     * @param {number} targetFloor - The target floor.\n     * @returns {boolean} True if the order is unique, false otherwise.\n     */\n    checkUniqueOrder(targetFloor) {\n        return !this.elvArr.some(elv => elv.currentDestinationFloor == targetFloor);\n    }\n    /**\n     * Calculates the time it will take for the elevator to finish its current task and reach the target floor.\n     * @param {Elevator} elv - The elevator.\n     * @param {number} targetFloor - The target floor.\n     * @returns {number} The time in seconds.\n     */\n    TimeToFinish(elv, targetFloor) {\n        return elv.floorDistance(targetFloor) * 0.5 + (((elv.finishTime) - Date.now()) / 1000);\n    }\n    /**\n     * Sets a timer for the target floor indicating the estimated arrival time of the elevator.\n     * @param {number} targetFloor - The target floor.\n     * @param {Floor} floor - The floor object.\n     * @param {Elevator} elv - The elevator.\n     */\n    sendTimer(targetFloor, floor, elv) {\n        let time = this.TimeToFinish(elv, targetFloor);\n        floor.setTimer(time);\n    }\n    /**\n     * Handles the elevator order for a given floor.\n     * @param {number} targetFloor - The target floor.\n     * @param {Floor} floor - The floor object.\n     */\n    ElvOrder(targetFloor, floor) {\n        let unique = this.checkUniqueOrder(targetFloor);\n        if (!unique) {\n            return;\n        }\n        let selectedElv = this.selectElv(targetFloor); // Select elevator\n        this.sendTimer(targetFloor, floor, selectedElv); // Set timer    \n        this.sendElv(selectedElv, targetFloor); // Send elevator\n    }\n}\nexports.ElevatorSystem = ElevatorSystem;\n\n\n//# sourceURL=webpack://e/./src/elevator_sistem.ts?");

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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Floor = void 0;\nconst timer_1 = __webpack_require__(/*! ./timer */ \"./src/timer.ts\");\n/**\n * Concrete implementation of a Floor.\n */\nclass Floor {\n    /**\n     * Creates an instance of Floor.\n     * @param {number} floorNum - The floor number.\n     * @param {(floorNum: number) => void} onClick - The callback function to handle button clicks for this floor.\n     */\n    constructor(floorNum, onClick) {\n        /** The screen to display the timer. */\n        this.screen = new timer_1.TimScreen();\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'floor';\n        this.addBlackLine();\n        this.addButton(floorNum, onClick);\n        this.addScreen();\n    }\n    /**\n     * Adds a black line to the floor's div element.\n     */\n    addBlackLine() {\n        const blackLine = document.createElement('div');\n        blackLine.className = 'blackline';\n        this.divElement.appendChild(blackLine);\n    }\n    /**\n     * Adds a button to the floor's div element.\n     * @param {number} floorNum - The floor number.\n     * @param {(floorNum: number) => void} onClick - The callback function to handle button clicks for this floor.\n     */\n    addButton(floorNum, onClick) {\n        const button = document.createElement('button');\n        button.className = 'metal linear';\n        button.textContent = `${floorNum}`;\n        button.addEventListener('click', () => onClick(floorNum));\n        this.divElement.appendChild(button);\n    }\n    /**\n     * Adds a screen element to the floor's div element.\n     */\n    addScreen() {\n        this.divElement.appendChild(this.screen.divElement);\n    }\n    /**\n     * Sets the timer on the screen for this floor.\n     * @param {number} time - The time to be displayed on the timer.\n     */\n    setTimer(time) {\n        this.screen.timer(time);\n    }\n}\nexports.Floor = Floor;\n\n\n//# sourceURL=webpack://e/./src/floor.ts?");

/***/ }),

/***/ "./src/floor_column.ts":
/*!*****************************!*\
  !*** ./src/floor_column.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.FloorColumn = void 0;\nconst floor_factory_1 = __webpack_require__(/*! ./factories/floor_factory */ \"./src/factories/floor_factory.ts\");\n/**\n * Class representing a column of floors in a building.\n */\nclass FloorColumn {\n    /**\n     * Creates an instance of FloorColumn.\n     * @param {number} floors - The number of floors in the building.\n     * @param {(floornum: number) => void} onClick - The callback function to handle floor button clicks.\n     */\n    constructor(floors, onClick) {\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'FloorColumn';\n        const floorFactory = new floor_factory_1.FloorFactory();\n        this.floorArry = [];\n        for (let i = floors; i >= 0; i--) {\n            const floor = floorFactory.createFloor(i, onClick);\n            this.floorArry.push(floor); // Add floor to the array\n            this.divElement.appendChild(floor.divElement);\n        }\n    }\n}\nexports.FloorColumn = FloorColumn;\n\n\n//# sourceURL=webpack://e/./src/floor_column.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n// import { Floor } from \"./floor\";\n// import { FloorFactory } from \"./factories/floor_factory\";\n// import { Elevator } from \"./elevator\";\n// import { ElevatorFactory } from \"./factories/elevator_factory\";\n// import { ElevatorSistem } from \"./elevator_sistem\";\n// import { FloorColumn } from \"./floor_column\";\n// import { Building } from \"./building\";\nconst building_factory_1 = __webpack_require__(/*! ./factories/building_factory */ \"./src/factories/building_factory.ts\");\nconst settings_1 = __webpack_require__(/*! ./settings */ \"./src/settings.ts\");\n/**\n * The main function to initialize and create buildings with elevators.\n */\nfunction main() {\n    const buildingFactory = new building_factory_1.BuildingFactory();\n    // Loop through the number of buildings specified in the configuration\n    for (let i = 0; i < settings_1.ElevatorConfig.numberOfBuildings; i++) {\n        buildingFactory.createBuilding();\n    }\n}\n// Run the main function\nmain();\n\n\n//# sourceURL=webpack://e/./src/index.ts?");

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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TimScreen = void 0;\n/**\n * Class representing a timer screen.\n */\nclass TimScreen {\n    /**\n     * Creates an instance of TimScreen.\n     */\n    constructor() {\n        this.divElement = document.createElement('div');\n        this.divElement.className = 'screen';\n    }\n    /**\n     * Sets a timer on the screen and updates the display until the time runs out.\n     * @param {number} time - The time in seconds for the timer.\n     */\n    timer(time) {\n        const startTime = performance.now();\n        const updateDisplay = () => {\n            const elapsedTime = performance.now() - startTime;\n            const remainingTime = time - elapsedTime / 1000; // Convert milliseconds to seconds\n            if (remainingTime <= 0) {\n                clearInterval(countdown);\n                this.divElement.textContent = \"\";\n            }\n            else {\n                this.divElement.textContent = String(remainingTime.toFixed(1)); // Display remaining time with one decimal place\n            }\n        };\n        updateDisplay(); // Initial call to display the timer immediately\n        const countdown = setInterval(updateDisplay, 500); // Update the display every 500 milliseconds\n    }\n}\nexports.TimScreen = TimScreen;\n\n\n//# sourceURL=webpack://e/./src/timer.ts?");

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