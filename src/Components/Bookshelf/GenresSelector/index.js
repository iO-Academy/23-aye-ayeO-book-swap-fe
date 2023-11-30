import React, { useEffect, useState } from 'react';

function GenresSelector({
    onGenreChangeID,
    className,
    label = null,
    defaultString = 'All',
    isDisabled = false,
    selectedGenre,
    setGenreId,
}) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URI}/genres`)
            .then((res) => res.json())
            .then((genres) => {
                genres.data && setGenres(genres.data);
            });
    }, []);

    function onGenreChange(genreId) {
        onGenreChangeID(genreId);
        setGenreId(genreId); // Move this inside onGenreChangeID if needed
    }

    // Add this effect to update the genre ID when selectedGenre changes
    useEffect(() => {
        const selectedGenreId = genres.find((genre) => genre.name === selectedGenre)?.id;
        if (selectedGenreId !== undefined) {
            setGenreId(selectedGenreId);
        }
    }, [selectedGenre, genres, setGenreId]);

    return (
        <div className='flex items-center gap-3 flex-row pr-3 text-slate-600'>
            {label && <label htmlFor='genreId'>{label}</label>}
            <select
                id='genreId'
                className={`rounded-md p-2 text-md bg-zinc-50 text-slate-600 ${className} focus:outline-none`}
                onChange={(e) => onGenreChange(e.target.value)}
                value={
                    selectedGenre ? genres.find((genre) => genre.name === selectedGenre)?.id : '0'
                }
            >
                <option key='0' value='0' disabled={isDisabled}>
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
