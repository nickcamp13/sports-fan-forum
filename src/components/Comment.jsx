import { Typography, Paper } from "@mui/material";

const Comment = ({ comment }) => {
  const { comment_text, created_at } = comment;

  return (
    <Paper>
      <Typography variant="body1">{comment_text}</Typography>
      {/* <Typography variant="body2">{created_at}</Typography> */}
    </Paper>
  );
};

export default Comment;
