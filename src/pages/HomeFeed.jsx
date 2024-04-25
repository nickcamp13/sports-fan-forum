import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { Box } from "@mui/material";
import FeedPost from "../components/FeedPost";

const SPORTSDB_KEY = import.meta.env.VITE_SPORTSDB_ANON_KEY;
const SPORTSDB_URL = `https://www.thesportsdb.com/api/v1/json/${SPORTSDB_KEY}`;

const HomeFeed = () => {
  const [feed, setFeed] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeed = async () => {
      setIsLoading(true)
      const {data, error} = await supabase.from("posts").select();
      setFeed(data)
      setIsLoading(false)
    }

    fetchFeed()
  }, [])

  if (isLoading) {
    return(
      <Box>Loading Feed...</Box>
    );
  }
  return(
    <Box>
      {feed && feed.map((post, i) => (
        <FeedPost key={`post-${i+1}`} post={post}/>
      ))}
    </Box>
  );
};

export default HomeFeed;
