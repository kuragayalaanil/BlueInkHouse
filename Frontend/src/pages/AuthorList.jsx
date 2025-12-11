import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/authors/`, {
        withCredentials: true,
      });
      console.log(res.data.data[0]);
      setAuthors(res.data.data);
    } catch (error) {
      console.error("Error fetching authors", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Authors</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div key={author._id} className="bg-white p-5 rounded-xl shadow">
            <img
              src={author.profile_img || "https://picsum.photos/300/200"}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-semibold text-gray-900">
              {author.name}
            </h2>

            <p className="text-gray-600 text-sm mb-1">
              <strong>Email: </strong> {author.email}
            </p>

            <p className="text-gray-600 text-sm mb-1">
              <strong>Status: </strong>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  author.status === "approved"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {author.status}
              </span>
            </p>

            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
              {author.bio || "No bio available"}
            </p>

            <p className="mt-3 text-gray-900 font-medium">
              Books: {author.TotalNumber_of_books}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
