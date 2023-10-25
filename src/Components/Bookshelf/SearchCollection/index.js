import React from "react";

function SearchCollection(props) {
    function onSearch(string) {
        props.onSearchChange(string);
    }

    return (
        <div>
            <label htmlFor="search-bar">Search:</label>
            <input onChange={(e) => onSearch(e.target.value)} id="search-bar" type="text"></input>
        </div>
    );
}

export default SearchCollection;
