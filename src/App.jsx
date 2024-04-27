import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid, Box } from "@mui/material";

import Navbar from "./components/Navbar";
import HomeFeed from "./pages/HomeFeed";
import Create from "./pages/Create";
import RightDrawer from "./pages/RightDrawer";
import Post from "./pages/Post";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <Router>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item md={9}>
          <Box sx={{padding: "1rem"}}>
            <Routes>
              <Route path="" element={<HomeFeed />} />
              <Route path="create-post" element={<Create />} />
              <Route path="post/:postId" element={<Post />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Box>
        </Grid>
        <Grid item md={3} sx={{bgcolor: "#25291C", minHeight: "100vh"}}>
          <RightDrawer />
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
