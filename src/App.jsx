import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts"
import Create from "./pages/Create";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Posts />}/>
          <Route path="/create-post" element={<Create />}/>
        </Routes>
    </>
  );
}

export default App;
