import { Link } from "react-router";
const Navbar = function () {
  return (
    <header className="bg-red-400 text-white shadow-lg">
      <div className="container mx-auto px-5">
        <div className="flex  justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
          Go-Code</Link>

          <nav className="space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors"> HOME</Link>
             <Link to="/about" className="hover:text-blue-200 transition-colors"> ABOUT</Link>
              <Link to="/blogs" className="hover:text-blue-200 transition-colors"> BLOGES</Link>
               <Link to="/add-blogs" className="hover:text-blue-200 transition-colors"> ADD blog</Link>
               

          </nav>
          </div>
</div>
    
    </header>
  );
};
export default Navbar