// import AlertBubble from "../../../Alert";

import "./review.css";

function Review({ review }) {
    return (
        <div>
            {/* <AlertBubble message="hola" /> */}
            <h4>{review.name}</h4>
            <p>{review.rating}/5 stars</p>
            <p>{review.review}</p>
        </div>
    );
}

export default Review;
