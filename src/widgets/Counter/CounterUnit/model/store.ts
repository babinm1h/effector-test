import { createEvent } from "effector";
import { createStore } from "effector/effector.umd";

export const $count = createStore(1);

export const increment = createEvent();
export const decrement = createEvent();

$count.on(increment, (st) => st + 1);
$count.on(decrement, (st) => st - 1);
