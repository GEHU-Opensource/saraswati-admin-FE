import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateTest from "./CreateTest";
import UpcomingTests from "./Upcoming";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createTest" element={<CreateTest />} />
        <Route path="/upcoming-tests" element={<UpcomingTests />} />
      </Routes>
    </Router>
  );
}

export default App;
