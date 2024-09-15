import {Clearance} from "./clearance";
import {Store} from "./store";

export interface FoodWasteByStore {
  clearances: Clearance[]
  store: Store
}
