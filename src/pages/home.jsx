import { useState, useEffect } from "react";
// import { dummyBlogs } from "../data";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
const HomePage = function () {
  const [recentBlog, setReacentBlog] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(function () {
    async function fetchRecentBlogs() {
      try {
        const response = await axios.get("https://blogapp-backend-1-gsf4.onrender.com/api/v1/blogs");
        setReacentBlog(response.data.slice(0, 4));
      } catch (error) {
        toast.error("Error fetching recent blog!!!");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecentBlogs();
  }, []);
  return (
    <main>
      {/*hero section  */}
      <section className="text-center py-16 bg-gradient-to-b from-red-700 to-purple-600 text-white rounded-lg mb-12">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 hover:text-amber-100 transition-hover cursor-auto
        "
        >
          Welcome to BlogApp
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Welcome to Go Code, your go-to place for tutorials, insights, and tips
          on web development, programming, and technology. Explore our latest
          posts and level up your skills.
        </p>
      </section>
      {/* recent blog section */}
      <section>
        <h2 className="text-3xl font-bold mb-1 text-center text-gray-800">
          Recent Blogs
        </h2>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : recentBlog.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
            {recentBlog.map(function (blog) {
              return <BlogCard key={blog._id} blog={blog} />;
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No Blog available yet</p>
            <Link
              to="/add-blog"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Write the First Blog
            </Link>
          </div>
        )}
        {recentBlog.length > 0 && (
          <div className="text-center">
            <Link
              to={"/blogs"}
              className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-600"
            >
              {" "}
              view all blogs
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};
export default HomePage;
