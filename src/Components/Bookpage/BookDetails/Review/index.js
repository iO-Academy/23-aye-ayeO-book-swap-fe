import StarRating from '../StarRating';

function Review({ review }) {
    return (
        <div className='bg-white border-slate-200 rounded-lg my-4 flex'>
            <div className='flex-shrink-0 p-6 w-45 bg-zinc-50 rounded-l-lg'>
                <h4 className='font-bold py-0'>{review.name}</h4>

                <StarRating rating={review.rating} />
            </div>
            <div className='flex-grow p-5 border-slate-200 mx-auto'>
                <p>{review.review}</p>
            </div>
        </div>
    );
}

export default Review;
