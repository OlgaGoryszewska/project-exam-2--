import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Venue from "./pages/Venue";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Venue" element={<Venue />} />
      </Routes>
    </div>
  );
}

export default App;
