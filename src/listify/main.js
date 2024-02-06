import { validate } from "./validate.js";
import { benchmark } from "./bench.js";
import { all } from './impls/all.js';

validate(...all);
benchmark(...all);
