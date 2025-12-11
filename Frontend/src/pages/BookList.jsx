import React, { useEffect, useState } from "react";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");

      setBooks(res.data.books);
    } catch (err) {
      console.log("Failed to fetch books", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">All Books</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition"
            >
              <img
                src={book.cover_image_url || "https://via.placeholder.com/300"}
                alt={book.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{book.title}</h2>

                <p className="text-gray-600 text-sm mb-2">
                  {book.description?.slice(0, 80)}...
                </p>

                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold">Genre:</span>{" "}
                  {book.genre || "N/A"}
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-bold">Author ID:</span> {book.author_id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
