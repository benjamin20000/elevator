1. **TimeScreen Class**:
   - Description: This class encapsulates an HTML element responsible for displaying the time for each elevator order. It also includes functionality related to managing timers.
   - Responsibilities:
     - Displaying time information for elevator orders.
     - Managing timers for various tasks within the elevator system.

2. **Floor Class**:
   - Description: Represents an individual floor within the building. It contains attributes such as the floor number and a timer clock.
   - Responsibilities:
     - Storing and managing floor-specific information such as the floor number.
     - Handling timer functionality related to floor activities.

3. **FloorFactory Class**:
   - Description: This class serves as a factory for creating instances of the Floor class.
   - Responsibilities:
     - Creating new instances of the Floor class with specified configurations.

4. **FloorColumn Class**:
   - Description: Contains a collection of Floor instances created by the FloorFactory class.
   - Responsibilities:
     - Holding and managing multiple instances of the Floor class within a vertical column structure.

5. **Elevator Class**:
   - Description: Represents an elevator unit within the building. It maintains data members for destination floors and finish times, along with functionality for updating movement progress and managing timers.
   - Responsibilities:
     - Tracking destination floors and finish times for elevator orders.
     - Updating movement progress and managing timers for elevator operations.

6. **ElevatorFactory Class**:
   - Description: Responsible for creating instances of the Elevator class, functioning as a factory.
   - Responsibilities:
     - Creating new instances of the Elevator class with specified configurations.

7. **ElevatorSystem Class**:
   - Description: Manages the allocation of elevator resources to fulfill incoming orders efficiently.
   - Responsibilities:
     - Selecting the appropriate elevator for each order based on current status and availability.
     - Setting timers and coordinating actions to ensure timely responses to elevator orders.

8. **Building Class**:
   - Description: Represents the entire building structure and coordinates communication between the FloorColumn and ElevatorSystem classes, as well as their respective subclasses.
   - Responsibilities:
     - Managing the integration of the FloorColumn and ElevatorSystem classes.
     - Facilitating communication and interaction between different components of the building system.

9. **ElevatorConfig Class**:
   - Description: Contains configuration settings for the elevator system, such as the number of floors, elevators, and building layout.
   - Responsibilities:
     - Storing and providing access to system-wide configuration parameters.
     - Facilitating customization and adjustment of system settings.
