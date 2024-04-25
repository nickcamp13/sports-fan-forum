import { Typography } from "@mui/material";

const Comment = ({ comment }) => {
  const { comment_text, created_at } = comment;

  return (
    <div>
      <Typography variant="body1">{comment_text}</Typography>
      <Typography variant="body2">{created_at}</Typography>
    </div>
  );
};

export default Comment;
