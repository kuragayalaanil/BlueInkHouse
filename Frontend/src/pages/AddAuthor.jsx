import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAuthor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profile_img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/authors/",
        formData,
        { withCredentials: true }
      );
      console.log(res);
      navigate("/authors");
    } catch (error) {
      console.log("Error in creating an author", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Author
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Author name"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="author@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-1 font-medium">Bio</label>
            <textarea
              name="bio"
              placeholder="Short author bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              rows={4}
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Profile Image URL</label>
            <input
              type="text"
              name="profile_img"
              placeholder="https://image-url.jpg"
              value={formData.profile_img}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            Create Author
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAuthor;
