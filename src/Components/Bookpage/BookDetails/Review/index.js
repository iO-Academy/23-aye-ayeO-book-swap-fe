import StarRating from '../StarRating';

function Review({ review }) {
    return (
        <div
            className='
        bg-white
        border-slate-200
        rounded-lg
        w-full
        my-4
        md:flex
        lg:flex-col
        xl:flex-row '
        >
            <div
                className='
            bg-zinc-50
            rounded-l-lg
            flex-shrink-0
            flex
            justify-start
            flex-col
            sm:flex-row
            md:flex-col
            lg:flex-row
            xl:flex-col
            gap-2
            p-6
            w-full
            md:w-48
            lg:w-full
            xl:w-48'
            >
                <StarRating rating={review.rating} />
                <h3
                    className='
                font-bold
                !text-lg
                py-0
                '
                >
                    {review.name}
                </h3>
            </div>
            <div
                className='flex-grow
            p-5
            border-slate-200
            min-w-0
            max-w-full'
            >
                <p className='break-words'>{review.review}</p>
            </div>
        </div>
    );
}

export default Review;
