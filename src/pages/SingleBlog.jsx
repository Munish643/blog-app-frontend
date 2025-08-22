import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router"; // ✅ use react-router-dom
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null); // object instead of array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/blogs/${id}` // dynamic id
        );
        setBlog(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("404 Blog not Found");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id]); //

  async function deleteBlog(id) {
    try {
      await axios.delete(`https://blogapp-backend-1-gsf4.onrender.com/api/v1/blogs/${id}`);
      toast("blog deleted !!!");
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      toast("error deleting the blog");
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold  text-gray-800 mb-4 ">
          Vlog not found
        </h1>
        <Link
          to={"/blogs"}
          className="bg-blue-700 text-white  px-6 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
        >
          Back to all blogs
        </Link>
      </div>
    );
  }

  const { author, content, createdAt, tags, title, _id } = blog;
  return (
    <main>
      <div className="max-w-4xl mx-auto"></div>
      <div className="bg-blue-300 rounded-lg shadow-md pd-8 "></div>
      {/* header */}
      <div className="mb-b">
        <Link
          to={"/blogs"}
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1"
        >
          <ArrowLeft />
          Back to all Blogs
        </Link>
        <h1 className="text-4xl font-bold text-gray-700 mb-4 ">{title}</h1>
        <div className="flex justify-between items-center text-gray-600 mb-6">
          <div>
            <span className="font-medium">By {author}</span>
            <span>{createdAt}</span>
          </div>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
            onClick={() => deleteBlog(_id)}
          >
            {" "}
            Delete blog
          </button>
        </div>
        {/* tags */}
        {tags && tags.length > 0 && (
          <div className="mb-6">
            {tags.map(function (str, index) {
              return (
                <span
                  key={index}
                  className="inline-block bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full mr-2"
                >
                  {tags}
                </span>
              );
            })}
          </div>
        )}

        {/* content */}
        <div className="prose max-w-none">
          <div className="text-gray-700 leading-relaxed white-pre-line text-lg">
            {content}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleBlog;
