import axios from "axios";
import { useEffect } from "react";
const SPORTSDB_KEY = import.meta.env.VITE_SPORTSDB_ANON_KEY;
const SPORTSDB_URL = `https://www.thesportsdb.com/api/v1/json/${SPORTSDB_KEY}`;

const Home = () => {
  return <div>Home</div>;
};

export default Home;
