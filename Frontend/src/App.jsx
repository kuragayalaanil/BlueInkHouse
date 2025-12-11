import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAuthor from "./pages/AddAuthor";
import AddBook from "./pages/AddBook";
import AuthorList from "./pages/AuthorList";
import BookList from "./pages/BookList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add-author" element={<AddAuthor />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/authors" element={<AuthorList />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
