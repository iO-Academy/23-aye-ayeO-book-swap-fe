import './bookcard.css';
import { Link } from 'react-router-dom';
import LazyImgLoader from '../LazyImgLoader';

function BookCard({ id, bookCover, title, author, genre, onClick }) {
    return (
        <Link
            to={'/books/' + id}
            className='sm:h-min-96 mx-2 w-full rounded-lg rounded-b-md bg-zinc-100 text-slate-800 sm:h-auto sm:w-72 sm:rounded-t-xl sm:p-0'
            onClick={onClick}
        >
            <div className='flex sm:flex-col'>
                <div
                    className='
                w-24
                overflow-hidden
                rounded-l-lg
                sm:h-[450px]
                sm:w-auto
                sm:rounded-b-none
                sm:rounded-t-xl
                '
                >
                    <LazyImgLoader
                        src={bookCover}
                        alt={title + ' cover'}
                        dimensions='w-full h-full'
                    />
                </div>
                <div className='flex w-2/3 flex-col justify-center p-5 sm:w-full sm:flex-none sm:p-5'>
                    <div className='h-14'>
                        <h2 className='pb-3 pt-0 text-base font-black text-slate-600'>
                            {title}
                        </h2>
                    </div>
                    <p className='text-sm text-zinc-600'>by {author}</p>
                    <p className='text-xs font-light text-zinc-800'>{genre}</p>
                </div>
            </div>
        </Link>
    );
}

export default BookCard;
