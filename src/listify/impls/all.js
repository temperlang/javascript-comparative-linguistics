import { listifyArrayFreeze } from "./array-freeze.js";
import { listifyArrayProxy } from "./array-proxy.js";

export const all = [listifyArrayProxy, listifyArrayFreeze];
