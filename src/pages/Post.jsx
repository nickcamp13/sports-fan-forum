import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import supabase from "../supabaseClient";
import { Box, Typography, Button, Paper } from "@mui/material";

const Post = () => {
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostById = async (id) => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id)
        .single();
      setPost(data);
      setUpvotes(data.upvotes);
    };
    const fetchComments = async (postId) => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching comments for this post: ", error.message);
        setComments(null);
      }

      setComments(data);
    };

    fetchPostById(postId);
    fetchComments(postId);
  }, [postId, upvotes]);

  const updatePostUpvotes = async (id, newUpvotes) => {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: newUpvotes })
      .eq("id", id);
  };

  const handleUpvote = () => {
    const updatedUpvotes = upvotes + 1;
    setUpvotes(updatedUpvotes);
    updatePostUpvotes(postId, updatedUpvotes);
  };
  const handleDownvote = () => {
    if (!hasDownvoted) {
      const updatedUpvotes = upvotes - 1;
      setUpvotes(updatedUpvotes);
      updatePostUpvotes(postId, updatedUpvotes);
      setHasDownvoted(true);
    }
  };

  const submitComment = async (postId, text) => {
    const { data, error, status, statusText } = await supabase
      .from("comments")
      .insert([{ post_id: postId, comment_text: text }])
      .single();

    if (error) {
      console.error("Error submitting comment: ", error.message);
      return null;
    }

    return data;
  };

  const handleCommentSubmit = async (e) => {
    if (commentText.trim()) {
      try {
        const newComment = await submitComment(postId, commentText);
        if (newComment) {
          setComments((prevComments) => [...prevComments, newComment]);
          setCommentText("");
        } else {
          console.error("No comment was returned from submitComment");
        }
      } catch (error) {
        console.error("Failed to submit Comment: ", error);
      }
    }
  };

  if (!post || !comments) {
    return <Box>Post Loading...</Box>;
  }
  return (
    <Box>
      <Paper sx={{ mb: "1rem" }}>
        <Typography variant="h2" sx={{ mb: "1rem" }}>
          {post.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            mb: "1rem",
          }}
        >
          {post.image_url && <img src={post.image_url} alt="" />}
          <Typography variant="body1">{post.content}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Upvotes: {post.upvotes}</Typography>
          <Button variant="outlined" onClick={handleUpvote}>
            Upvote
          </Button>
          <Button
            variant="outlined"
            onClick={handleDownvote}
            disabled={hasDownvoted}
          >
            Downvote
          </Button>
        </Box>
      </Paper>
      <Box>
        <form
          onSubmit={handleCommentSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <Box>
            <textarea
              cols="40"
              rows="5"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Leave a comment"
            />
          </Box>
          <Box>
            <Button variant="contained" type="submit">
              Add Comment
            </Button>
          </Box>
        </form>
        <Box>
          <Typography variant="h5" sx={{ mb: "0.5rem" }}>
            Comments
          </Typography>
          <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
