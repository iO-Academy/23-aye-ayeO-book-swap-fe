import './bookcard.css';
import { Link } from 'react-router-dom';
import ImgLoader from '../ImgLoader';

function BookCard({ id, bookCover, title, author, genre }) {
    return (
        <Link
            to={'/books/' + id}
            className='sm:w-72 p-6 bg-zinc-100 rounded  text-slate-800 w-full'
        >
            <div className='flex sm:flex-col'>
                <ImgLoader
                    src={bookCover}
                    alt={title + ' cover'}
                    w='60'
                    h='96'
                />
                <div>
                    <h2 className='text-xl'>{title}</h2>
                    <p className='text-slate-600 text-sm'>by {author}</p>
                    <p className='text-slate-600 text-xs font-light'>{genre}</p>
                </div>
            </div>
        </Link>
    );
}

export default BookCard;
