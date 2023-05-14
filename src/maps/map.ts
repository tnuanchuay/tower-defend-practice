import {AvailableSlot} from "../scenes/slot";
import {Waypoint} from "../scenes/waypoint";
import {Slot} from "../objects/slot";

export interface Map {
    availableSlots: AvailableSlot[];
    waypoints: Waypoint[];
    slots: Slot[];
}