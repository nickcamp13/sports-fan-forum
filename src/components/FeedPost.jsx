import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const FeedPost = ({ post }) => {
  const { title, created_at, upvotes } = post;

  return (
    <Link to={`/post/${title}`}>
      <Box>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle1">{upvotes}</Typography>
        <Typography variant="body1">{created_at}</Typography>
      </Box>
    </Link>
  );
};

export default FeedPost;
