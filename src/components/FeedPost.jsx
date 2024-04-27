import { Box, Typography } from "@mui/material";
import { ThumbUpSharp } from "@mui/icons-material";
import { useState } from "react";

const FeedPost = ({ post }) => {
  const { title, created_at, upvotes } = post;
  const [postTime, setPostTime] = useState(new Date(created_at))

  const timeSince = () => {
    const now = new Date(); // current time
    const difference = now - postTime; // difference in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Format the output
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}


  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle1"><ThumbUpSharp /> {upvotes}</Typography>
      </Box>
      <Typography variant="body1">Posted {timeSince()}</Typography>
    </Box>
  );
};

export default FeedPost;
