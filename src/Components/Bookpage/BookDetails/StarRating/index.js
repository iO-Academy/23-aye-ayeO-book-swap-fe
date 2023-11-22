import React from 'react';

const StarRating = ({ rating }) => {
    return (
        <div
            className='Stars'
            style={{ '--rating': `${rating}` }}
            aria-label={`Rating: ${rating} out of 5`}
            role='img'
        ></div>
    );
};

export default StarRating;
