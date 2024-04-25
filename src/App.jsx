import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/HomeFeed";
import Create from "./pages/Create";
import RightDrawer from "./components/RightDrawer";
import Post from "./pages/Post";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item md={10}>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="create-post" element={<Create />} />
            <Route path="post/:title" element={<Post />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Grid>
        <Grid item md={2}>
          <RightDrawer />
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
