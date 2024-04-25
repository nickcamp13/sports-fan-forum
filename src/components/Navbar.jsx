import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Navbar = () => {
  return (
    <nav>
      <Typography>
        ESFF
      </Typography>
      <ul>
        <li>
          <Link to={""}>Home Feed</Link>
        </li>
        <li>
          <Link to={"create-post"}>Add New Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
