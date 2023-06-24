import React from "react";
import Counter from "../../widgets/Counter/Counter";
import PostList from "../../widgets/PostsList/PostList";
import { Stack } from "@mui/material";
import PostForm from "../../entities/posts/ui/PostForm";
import CounterUnit from "../../widgets/Counter/CounterUnit/CounterUnit";

const Home = () => {
  return (
    <Stack gap={4}>
      <Counter />
      <CounterUnit />
      <PostForm />
      <PostList />
    </Stack>
  );
};

export default Home;

