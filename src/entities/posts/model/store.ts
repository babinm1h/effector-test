import { createEffect } from "effector/effector.mjs";
import { PostsApi } from "../api/postsApi";
import { createStore, sample } from "effector";
import { IPost, IPostDto } from "./types";
import { createEvent } from "effector/compat";
import React from "react";

export const $posts = createStore<IPost[]>([]);
export const $postsError = createStore<string>("");
export const $postForm = createStore<IPostDto>({ body: "", title: "" });

//
export const fetchPostsEff = createEffect<void, IPost[], Error>(async () => {
  const posts = await PostsApi.getPosts();
  return posts;
});

fetchPostsEff.done.watch(({ params, result }) => {
  console.log({ params, result }, "fetch posts done");
});
fetchPostsEff.pending.watch((bool) => {
  console.log({ bool }, "fetch posts pending");
});
fetchPostsEff.fail.watch(({ error, params }) => {
  console.error({ error: error.message, params }, "fetch posts error");
});

export const addPost = createEvent<IPostDto>();
export const removePost = createEvent<number>();

$posts.on(fetchPostsEff.doneData, (_, payload) => payload);
$postsError.on(fetchPostsEff.failData, (_, payload) => payload.message);

$posts.on(addPost, (state, payload) => [{ id: Date.now(), ...payload }, ...state]);
$posts.on(removePost, (state, id) => state.filter((p) => p.id !== id));

export const setPostFormField = createEvent<{ key: keyof IPostDto; value: string }>();
export const submitPostForm = createEvent<React.FormEvent>();

$postForm.on(setPostFormField, (state, payload) => {
  return { ...state, [payload.key]: payload.value };
});

// When CLOCK is triggered, read the value from SOURCE and trigger TARGET with it.
sample({
  clock: submitPostForm,
  source: $postForm,
  target: addPost,
});

submitPostForm.watch((e) => e.preventDefault());

