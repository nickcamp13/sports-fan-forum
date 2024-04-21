import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
const KEY = import.meta.env.VITE_SPORTSDB_ANON_KEY;
const URL = `https://www.thesportsdb.com/api/v1/json/${KEY}`;

const RightDrawer = () => {
  const [events, setEvents] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const leagueID = 4425;
      const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDay()]

      // show today's event or next 15
      let res = await axios.get(`${URL}/eventsday.php?d=${year}-${month}-${day}&l=${leagueID}`);
      if (res.data === "") {
        res = await axios.get(`${URL}/eventsnextleague.php?id=${leagueID}`)
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
      {events.length === 1 ? (
        <Typography>Todays Event</Typography>
      ) : (
        <Typography>Upcoming Events</Typography>
      )}
    </div>
  )
};

export default RightDrawer;
