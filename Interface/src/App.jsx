import "./App.css";
import Register from "./components/Register.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Projects from "./components/Projects.jsx";
import AboutUs from "./components/AboutUs.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="Home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;
