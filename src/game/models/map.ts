import {AvailableSlot} from "./slot";
import {Waypoint} from "./waypoint";
import {Slot} from "../../objects/slot";

export interface Map {
    availableSlots: AvailableSlot[];
    waypoints: Waypoint[];
    slots: Slot[];
}