import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav>
      <h1>THE NINETEENTH HOLE</h1>
      <ul>
        <li>
          <Link to={"/"}>Home Feed</Link>
        </li>
        <li>
          <Link to={"/create-post"}>Add New Post</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Navbar;
