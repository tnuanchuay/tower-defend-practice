import {AvailableSlot} from "../game/slot";
import {Waypoint} from "../game/waypoint";
import {Slot} from "../objects/slot";

export interface Map {
    availableSlots: AvailableSlot[];
    waypoints: Waypoint[];
    slots: Slot[];
}