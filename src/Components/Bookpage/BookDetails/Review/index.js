function Review({ review }) {
    return (
        <div className="bg-white  border-slate-200 rounded-md my-4 flex">
            <div className="flex-shrink-0 p-5 w-40 bg-rose-50 rounded-l-md">
                <h4 className="font-bold py-0">{review.name}</h4>
                <p>{review.rating}/5 stars</p>
            </div>
            <div className="flex-grow p-5 border-slate-200">
                <p>{review.review}</p>
            </div>
        </div>
    );
}

export default Review;
