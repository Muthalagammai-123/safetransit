import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Home from "./home";
import About from "./about";
import Feedback from "./feedback";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./admin"
import Fd from "./fd";
import Contact from "./contact";
import View from "./view";
import JobApplication from "./jobApplication";  // ✅ new page
import { useParams } from "react-router-dom";
import Book from './book';



function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/fd" element={<Fd />} />
          <Route path="/view" element={<View />} />
          <Route path="/contact" element={<Contact />} />
           <Route path="/book" element={<Book />} />


          {/* ✅ new route for job application */}
          <Route path="/apply/:jobTitle" element={<JobApplicationWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// ✅ Wrapper to get job title from URL
const JobApplicationWrapper = () => {
  const { jobTitle } = useParams();
  return <JobApplication jobTitle={decodeURIComponent(jobTitle)} />;
};

export default App;
