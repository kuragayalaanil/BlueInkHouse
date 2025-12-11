import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    cover_image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/books", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/books");

      setFormData({
        title: "",
        description: "",
        genre: "",
        cover_image_url: "",
      });
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Add New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Write a brief description"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="e.g. Fiction, Mystery, Fantasy"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            name="cover_image_url"
            value={formData.cover_image_url}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
