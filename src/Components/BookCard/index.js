import React, { useEffect, useState } from "react";
import "./bookcard.css";

function BookCard({ bookCover, title, author, genre }) {
  return (
    <div>
      <img src={bookCover} alt={title + " cover"} />
      <h2>{title}</h2>
      <p>{author}</p>
      <p>{genre}</p>
    </div>
  );
}

export default BookCard;
