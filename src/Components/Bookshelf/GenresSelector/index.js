// This GenresSelector is used as both controlled and uncontrolled component
// When used as filter, the value of the select element is not controlled by React
// but by manual user selection. When genre is set by an API response and state change,
// it is Controlled.

// UNCONTROLLED
// 1. selectedGenre starts as undefined and the visual selection defaults to option 0 - All

// 2. When user makes a selection selectedGenre uses the id of the genre (from select element)

// CONTROLLED
// 1. selectedGenre starts as undefined

// 2. When state changes, it is given a string by API or user selection. Usually API would provide
//    a string that is name of a genre or undefined. User selection would provide the  id of the genre (from select element)

// 3. If the string is a valid Genre name from DB, genreId is updated with the corresponding id from db.
//    In AddBook genreId is used to populate the POST request for adding a new book.
//    Setting selectedGenre triggers component re-render, and visual selection is made by finding
//    the id from the provided string. If string is not valid, no selection is made.

// 4. If user makes a manual selection - selectedGenre is updated with the id. Any change of state here would trigger re-render

import React, { useEffect, useState } from "react";

function GenresSelector({
  className,
  label = null,
  defaultString = "All",
  isDisabled = false,
  selectedGenre, // used when component is controlled
  isControlled,
  updateGenre,
  setGenreError,
}) {
  const [genres, setGenres] = useState([]);

  // Get genres from DB
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/genres`)
      .then((res) => res.json())
      .then((genres) => {
        genres.data && setGenres(genres.data);
      });
  }, []);

  // When state updated
  useEffect(() => {
    const selectedGenreId =
      selectedGenre && genres.find((genre) => genre.name === selectedGenre)?.id;

    if (selectedGenreId !== undefined) {
      updateGenre(selectedGenreId);
    }
  }, [selectedGenre, genres, updateGenre]);

  return (
    <div className="mb-2 mt-1 flex flex-row items-center gap-3 text-lg text-slate-600 sm:pr-3">
      {label && (
        <label htmlFor="genreId" className="sr-only">
          {label}
        </label>
      )}
      <select
        id="genreId"
        className={`rounded-md bg-zinc-50 p-2 text-lg text-slate-600 ${className} ring-lime-500/30 focus:outline-none focus:ring-4`}
        onChange={(e) => {
          updateGenre(e.target.value);
          isControlled && setGenreError(false);
        }}
        value={
          !isControlled
            ? selectedGenre
            : selectedGenre
              ? genres.find((genre) => genre.name === selectedGenre)?.id
              : "0"
        }
      >
        <option key="0" value="0" disabled={isDisabled}>
          {defaultString}
        </option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenresSelector;
