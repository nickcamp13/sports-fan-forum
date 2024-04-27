import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";

const KEY = import.meta.env.VITE_SPORTSDB_ANON_KEY;
const URL = `https://www.thesportsdb.com/api/v1/json/${KEY}`;

const EventCard = ({ event }) => {
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const { idHomeTeam, idAwayTeam } = event;

      const home = await axios.get(`${URL}/lookupteam.php?id=${idHomeTeam}`);
      const away = await axios.get(`${URL}/lookupteam.php?id=${idAwayTeam}`);

      setHomeTeam(home.data.teams[0]);
      setAwayTeam(away.data.teams[0]);
    };

    fetchTeams();
  }, []);

  if (!homeTeam || !awayTeam) {
    return (
      <Typography variant="body1" sx={{ color: "#F3E8EE" }}>
        Loading Event Data...
      </Typography>
    );
  }

  return (
    <Box sx={{ width: 200, margin: "0 auto" }}>
      <Box>
        <img src={homeTeam.strTeamBadge} alt="" />
        <Typography variant="body1" sx={{ color: "#F3E8EE" }}>
          {" "}
          vs.{" "}
        </Typography>
        <img src={awayTeam.strTeamBadge} alt="" />
      </Box>
    </Box>
  );
};

export default EventCard;
