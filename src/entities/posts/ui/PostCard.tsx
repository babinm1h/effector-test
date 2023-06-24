import React from "react";
import { IPost } from "../model/types";
import { Button, Card, Stack } from "@mui/material";
import { removePost } from "../model/store";

const PostCard = ({ body, id, title }: IPost) => {
  const handleRemove = () => {
    removePost(id);
  };

  return (
    <Card elevation={4} sx={{ padding: "10px" }}>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Stack gap={1}>
          <div>
            {id} {title}
          </div>
          <div>{body}</div>
        </Stack>
        <Stack>
          <Button type="button" variant="contained" onClick={handleRemove}>
            remove
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PostCard;

