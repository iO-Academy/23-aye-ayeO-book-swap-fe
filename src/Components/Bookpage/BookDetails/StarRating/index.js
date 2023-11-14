import React from "react";

const StarRating = ({ rating }) => {
    return (
        <div
            className="Stars"
            style={{ "--rating": `${rating}` }}
            aria-label={`Rating of this product is ${rating} out of 5.`}
            role="presentation"
        ></div>
    );
};

export default StarRating;
