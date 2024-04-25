import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { Box } from "@mui/material";
import FeedPost from "../components/FeedPost";
import { Link } from "react-router-dom";

const SPORTSDB_KEY = import.meta.env.VITE_SPORTSDB_ANON_KEY;
const SPORTSDB_URL = `https://www.thesportsdb.com/api/v1/json/${SPORTSDB_KEY}`;

const HomeFeed = () => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      const { data, error } = await supabase.from("posts").select();
      setFeed(data);
    };

    fetchFeed();
  }, []);

  if (!feed) {
    return <Box>Loading Feed...</Box>;
  }
  return (
    <Box>
      {feed &&
        feed.map((post) => (
          <Link key={post.id} to={`post/${post.id}`}>
            <FeedPost post={post} />
          </Link>
        ))}
    </Box>
  );
};

export default HomeFeed;
