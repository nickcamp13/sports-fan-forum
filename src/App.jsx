import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import RightDrawer from "./components/RightDrawer";

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
