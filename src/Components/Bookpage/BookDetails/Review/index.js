import StarRating from '../StarRating';

function Review({ review }) {
    return (
        <div className='bg-white border-slate-200 w-full rounded-lg my-4 sm:flex'>
            <div className='flex-shrink-0 p-6 w-45 bg-zinc-50 rounded-l-lg'>
                <h3 className='font-bold !text-lg py-0'>{review.name}</h3>

                <StarRating rating={review.rating} />
            </div>
            <div className='flex-grow p-5 border-slate-200 mx-auto'>
                <p>{review.review}</p>
            </div>
        </div>
    );
}

export default Review;
