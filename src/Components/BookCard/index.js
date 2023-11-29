import './bookcard.css';
import { Link } from 'react-router-dom';
import LazyImgLoader from '../LazyImgLoader';

function BookCard({ id, bookCover, title, author, genre, onClick }) {
    return (
        <Link
            to={'/books/' + id}
            className='sm:w-72 sm:h-auto sm:p-0 bg-zinc-100 sm:rounded-t-xl rounded-b-md rounded-lg text-slate-800 w-full mx-2 sm:h-min-96'
            onClick={onClick}
        >
            <div className='flex sm:flex-col '>
                <div
                    className='
                sm:h-[450px]
                sm:w-auto
                w-24
                rounded-l-lg
                sm:rounded-t-xl
                sm:rounded-b-none
                overflow-hidden
                '
                >
                    <LazyImgLoader
                        src={bookCover}
                        alt={title + ' cover'}
                        dimensions='w-full h-full'
                    />
                </div>
                <div className='flex flex-col justify-center sm:flex-none sm:p-5 p-5 w-2/3 sm:w-full'>
                    <h2 className='text-xl pb-3 pt-0 '>{title}</h2>
                    <p className='text-slate-600 text-sm'>by {author}</p>
                    <p className='text-slate-600 text-xs font-light'>{genre}</p>
                </div>
            </div>
        </Link>
    );
}

export default BookCard;
