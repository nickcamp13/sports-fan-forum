import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { Box } from "@mui/material";
import FeedPost from "../components/FeedPost";
import { Link } from "react-router-dom";

const SPORTSDB_KEY = import.meta.env.VITE_SPORTSDB_ANON_KEY;
const SPORTSDB_URL = `https://www.thesportsdb.com/api/v1/json/${SPORTSDB_KEY}`;

const HomeFeed = () => {
  const [feed, setFeed] = useState([]);
  const [sortedPosts, setSortedPosts] = useState(null);
  const [orderBy, setOrderBy] = useState("time");

  useEffect(() => {
    const fetchFeed = async () => {
      const { data, error } = await supabase.from("posts").select();
      setFeed(data);
      setSortedPosts(feed);
    };

    fetchFeed();
  }, []);

  useEffect(() => {
    sortPosts(orderBy);
  }, [orderBy, feed]);

  const sortPosts = (criteria) => {
    const postsCopy = [...feed];
    if (criteria === "time") {
      postsCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (criteria === "upvotes") {
      postsCopy.sort((a, b) => b.upvotes - a.upvotes);
    }
    setSortedPosts(postsCopy);
  };

  const handleSortChange = (e) => {
    setOrderBy(e.target.value);
  };

  if (feed.length === 0) {
    return <Box>Loading Feed...</Box>;
  }
  return (
    <Box>
      <Box>
        <select value={orderBy} onChange={handleSortChange}>
          <option value="time">Sort by Time</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </Box>
      <Box>
        {feed &&
          sortedPosts.map((post) => (
            <Link key={post.id} to={`post/${post.id}`}>
              <FeedPost post={post} />
            </Link>
          ))}
      </Box>
    </Box>
  );
};

export default HomeFeed;
