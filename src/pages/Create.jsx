import { useState } from "react";
import supabase from "../supabaseClient";
import { Box, Typography, Paper, Button } from "@mui/material";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const uploadImage = async () => {
    // Check if there is an image to upload
    if (!imageFile) return null;

    // Upload prep - file path creation
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // upload image to supabase storage
    let { error: uploadError, data } = await supabase.storage
      .from("post-images")
      .upload(filePath, imageFile);

    // error handling
    if (uploadError) {
      throw new Error("Failed to upload image: " + uploadError.message);
    }

    console.log("data: ", data);
    return data.path;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const imageUrl = await uploadImage();
      const { data, error } = await supabase.from("posts").insert([
        {
          title,
          content,
          image_url: imageUrl
            ? `${
                import.meta.env.VITE_SUPABASE_URL
              }/storage/v1/object/public/post-images/${imageUrl}`
            : null,
        },
      ]);

      if (error) throw new Error(error.message);
      alert("Post created successfully!");
      setTitle("");
      setContent("");
      setImageFile(null);
    } catch (error) {
      setError(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <Box>
      <Typography variant="h2" sx={{mb: "1rem"}}>Make A New Post</Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Paper sx={{ width: "400px" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginBottom: "0.5rem" }}
          />
          <label htmlFor="">Content</label>
          <textarea
            cols="40"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add Text..."
            style={{ marginBottom: "0.5rem" }}
          ></textarea>
          <label>Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "0.5rem" }}
          />
          <Box>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating New Post..." : "Create Post"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Create;
