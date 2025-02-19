import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import VideoPlayer from "./components/VideoPlayer";
import VideoUpload from "./components/VideoUpload";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/upload" element={<VideoUpload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
