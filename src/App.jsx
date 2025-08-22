import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/About";
import AllBlogs from "./pages/AllBlog";
import SingleBlog from "./pages/SingleBlog";
import AddBlog from "./pages/AddBlog";
import Navbar from "./components/NavBar";
import{ToastContainer} from "react-toastify"

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/add-blogs" element={<AddBlog />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
          </Routes>
        </div>
        <ToastContainer/>
      </div>
    </BrowserRouter>
  );
};

export default App;
