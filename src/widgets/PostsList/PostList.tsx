import { Alert, CircularProgress, Stack } from "@mui/material";
import { useStore } from "effector-react/compat";
import React from "react";
import { $posts, $postsError, fetchPostsEff } from "../../entities/posts/model/store";
import PostCard from "../../entities/posts/ui/PostCard";
import { useEvent, useList } from "effector-react";

const PostList = () => {
  const posts = useStore($posts);
  const fetchPosts = useEvent(fetchPostsEff);
  const isPostsLoading = useStore(fetchPostsEff.pending);
  const postsError = useStore($postsError);

  console.log({ postsError });

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const renderList = useList($posts, (item) => {
    return <PostCard {...item} />;
  });

  if (isPostsLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack direction={"column"} gap={4}>
      {postsError && (
        <Alert variant="standard" color="error">
          {postsError}
        </Alert>
      )}

      <Stack direction={"row"} gap={5}>
        <div>
          {posts.map((p) => (
            <PostCard {...p} key={p.id} />
          ))}
        </div>

        <div>{renderList}</div>
      </Stack>
    </Stack>
  );
};

export default PostList;

