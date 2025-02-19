import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            EnderFlix
          </Link>
          <div>
            <Link
              to="/upload"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Upload Video
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
