import React, { useEffect, useState } from "react";

function GenresSelector({ onGenreChangeID, className, label, defaultString = "All" }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/genres")
            .then((res) => res.json())
            .then((genres) => {
                setGenres(genres.data);
            });
    }, []);

    function onGenreChange(genreId) {
        onGenreChangeID(genreId);
    }

    return (
        <div>
            <label htmlFor="genreId">{label}</label>
            <br />
            <select id="genreId" className={className} onChange={(e) => onGenreChange(e.target.value)}>
                <option key="0" value="0">
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
