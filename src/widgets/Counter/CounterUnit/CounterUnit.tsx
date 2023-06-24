import { Button, Stack } from "@mui/material";
import { useStore } from "effector-react";
import { useUnit } from "effector-react/effector-react.umd";
import React from "react";
import { $count, decrement, increment } from "./model/store";

const CounterUnit = () => {
  const [count, inc, dec] = useUnit([$count, increment, decrement]);

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <Button variant="contained" onClick={dec}>
        dec
      </Button>
      {count}
      <Button variant="contained" onClick={inc}>
        inc
      </Button>
    </Stack>
  );
};

export default CounterUnit;

