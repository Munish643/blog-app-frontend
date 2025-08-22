import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";

const AddBlog = function () {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const newBlog = {
      title: title,
      content: content,
      author: author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };
    console.log(newBlog);

    try {
      setIsLoading(true);
      axios.post("http://localhost:8080/api/v1/blogs", newBlog);
      navigate("/blogs");
      toast("New blog added!!!!");
    } catch (error) {
      console.log(error);
      toast("Error creating the blog.Please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto">
      <h1 className="flex items-center justify-center gap-2   text-4xl text-gray-700 font-bold mb-8 text-center">
        Write new blog
        <SquarePen width={32} height={32} />
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            {" "}
            Title{" "}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-3 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your blog title"
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="Author"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            {" "}
            Author{" "}
          </label>
          <input
            type="text"
            id="Author"
            name="Author"
            required
            className="w-full px-3 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
            placeholder="your name"
            value={author}
            onChange={function (e) {
              setAuthor(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            {" "}
            Content{" "}
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={12}
            className="w-full px-3 py-2 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter your blog content...."
            value={content}
            onChange={function (e) {
              setContent(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            {" "}
            tags{" "}
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            required
            className="w-full px-3 py-2 border border-b-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent"
            placeholder="Enter tags separated by comma (eg..,technology,react"
            value={tags}
            onChange={function (e) {
              setTags(e.target.value);
            }}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? "Publishing..." : "Publish blog"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddBlog;
