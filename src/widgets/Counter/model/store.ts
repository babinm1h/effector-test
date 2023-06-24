import { combine, createEvent, createStore, forward } from "effector";

export const increment = createEvent<number>();
export const decrement = createEvent<number>();
const logger = createEvent();

const $counter = createStore(0, {
  updateFilter(update, current) {
    console.log({ update, current });
    return typeof update === "number";
  },
});
const $counterText = $counter.map((state) => `current value = ${state}`);

$counter.on(increment, (val) => val + 1);
$counter.on(decrement, (val) => val - 1);

export const counterCombined = combine({ counter: $counter, counterText: $counterText });

increment.watch((pay) => console.log("inc payload", pay));
decrement.watch((pay) => console.log("dec payload", pay));

// from Источник обновлений. Forward будет отслеживать изменения этих unit
// to  Цель для обновлений. forward запустит эти unit с данными из from
forward({ from: $counter, to: logger });
$counter.on(logger, (_, pay) => console.log({ pay }, "forward"));

