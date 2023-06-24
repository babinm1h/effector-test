import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { $postForm, addPost, setPostFormField, submitPostForm } from "../model/store";
import { useStore } from "effector-react/effector-react.mjs";
import { IPostDto } from "../model/types";

const PostForm = () => {
  const { body, title } = useStore($postForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({ body, title });
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostFormField({ key: e.target.name as keyof IPostDto, value: e.target.value });
  };

  return (
    <form onSubmit={submitPostForm}>
      <Stack gap={2} width={400}>
        <TextField value={body} onChange={onChangeField} label="body" variant="filled" name="body" />
        <TextField value={title} onChange={onChangeField} label="title" variant="filled" name="title" />
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default PostForm;

