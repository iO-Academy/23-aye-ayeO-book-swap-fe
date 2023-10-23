import React from "react";

function SearchCollection(props) {
    function onSearch(string) {
        props.onSearchChange(string);
    }

    return (
        <div>
            <input onChange={(e) => onSearch(e.target.value)} type="text" placeholder="Search.."></input>
        </div>
    );
}

export default SearchCollection;
