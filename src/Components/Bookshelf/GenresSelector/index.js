import React, { useEffect, useState } from "react";

function GenresSelector(props) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/genres")
            .then((res) => res.json())
            .then((genres) => {
                setGenres(genres.data);
            });
    }, []);

    function onGenreChange(genreId) {
        props.onGenreChangeID(genreId);
    }

    return (
        <div>
            <label htmlFor="genreId">Filter by genre:</label>
            <select id="genreId" onChange={(e) => onGenreChange(e.target.value)}>
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
