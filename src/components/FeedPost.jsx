import { Box, Typography } from "@mui/material";

const FeedPost = ({ post }) => {
  const { title, created_at, upvotes } = post;

  return (
      <Box>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle1">{upvotes}</Typography>
        <Typography variant="body1">{created_at}</Typography>
      </Box>
  );
};

export default FeedPost;
