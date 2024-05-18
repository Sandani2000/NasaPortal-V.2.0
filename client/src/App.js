import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Apod from "./components/Apod";
import ContactUs from "./pages/ContactUs";
import RoverPhotosBySol from "./components/RoverPhotosBySol";
import RoverPhotosByEarthDate from "./components/RoverPhotosByEarthDate";
import MissionManifest from "./components/MissionManifest";

import Random2 from "./pages/Random2";
import LandingPage from "./pages/LandingPage";
import NavHome from "./components/NavHome";
import History from "./pages/History";
import NavBar from "./components/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isExploreAPOD, setIsExploreAPOD] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleExploreAPOD = () => {
    setIsExploreAPOD(true);
  };
  
  return (
    <Router>
      <div className="App">
        <NavBar/>
        {/* {isLoggedIn ? <NavBar /> : <NavHome />} */}
        
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/explore" element={<LandingPage  />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* APOD */}
          <Route path="/apod" element={<Apod />} />
          <Route path="/history" element={<History />} />
          <Route path="/random" element={<Random2 />} />

          {/* Mars Rover */}
          <Route path="/roverPhotosBySol" element={<RoverPhotosBySol />} />
          <Route path="/missionManifest" element={<MissionManifest />} />
          <Route
            path="/RoverPhotosByEarthDate"
            element={<RoverPhotosByEarthDate />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
