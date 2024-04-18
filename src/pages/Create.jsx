import { useState } from "react";
import supabase from "../supabaseClient";

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
    <div>
      <h2>Make A New Post</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            cols="30"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add Text..."
          ></textarea>
        </div>
        <div>
          <label>Image Upload</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating New Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default Create;
