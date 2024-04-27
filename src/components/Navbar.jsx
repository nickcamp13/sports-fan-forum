import { Link } from "react-router-dom";
import { Typography, AppBar, Button, Toolbar, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h3">Entertainment Sports Fan Forum</Typography>
        <Box sx={{display: "flex"}}>
          <Button>
            <Link to={""}>Home Feed</Link>
          </Button>
          <Button>
            <Link to={"create-post"}>Add New Post</Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
