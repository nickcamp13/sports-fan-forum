import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Typography, Box } from "@mui/material";
import axios from "axios";

const KEY = import.meta.env.VITE_SPORTSDB_ANON_KEY;
const URL = `https://www.thesportsdb.com/api/v1/json/${KEY}`;

const RightDrawer = () => {
  const [events, setEvents] = useState(null);
  const [date, setDate] = useState(new Date());
  const [drawerHeader, setDrawerHeader] = useState("Today's Events")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const leagueID = 4387; // NBA ID
      const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate() + 1]
      const formattedMonth = month < 10 ? `0${month}` : month;
      let formattedDay = day < 10 ? `0${day}` : day;

      // fetch today's event or next 15
      let res = await axios.get(`${URL}/eventsday.php?d=${year}-${formattedMonth}-${formattedDay}&l=${leagueID}`);
      if (res.data === "") {
        res = await axios.get(`${URL}/eventsnextleague.php?id=${leagueID}`)
        setDrawerHeader("Upcoming Events")
      } 

      setEvents(res.data.events)
      setIsLoading(false)
    };

    fetchData();
  }, [date]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return(
    <div>
      <Typography variant="subtitle2">{drawerHeader}</Typography>
      <Box>
        {events && events.map((event) => (
          <EventCard key={`event-${event.idEvent}`} event={event}/>
        ))}
      </Box>
    </div>
  )
};

export default RightDrawer;
