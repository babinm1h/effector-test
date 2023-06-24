import { Button, Stack } from "@mui/material";
import { useStore } from "effector-react";
import React from "react";
import { counterCombined, decrement, increment } from "./model/store";

const Counter = () => {
  const counter = useStore(counterCombined);

  const onDec = () => {
    decrement(1);
  };

  const onInc = () => {
    increment(1);
  };

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <Button variant="contained" onClick={onDec}>
        dec
      </Button>
      {counter.counter}
      <Button variant="contained" onClick={onInc}>
        inc
      </Button>
      <span>{counter.counterText}</span>
    </Stack>
  );
};

export default Counter;

