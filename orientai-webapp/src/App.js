import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage.js";
// import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.js";
import TestPage from "./pages/TestPage.jsx";
import ResultsPage from "./pages/ResultsPage.js";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.js";
import SignupPage from "./pages/SignupPage.jsx";

const App = () => {
  return (
    <Router basename="/">
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
