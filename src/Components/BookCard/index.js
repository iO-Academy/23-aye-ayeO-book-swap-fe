import { useState } from 'react';
import './bookcard.css';
import { Link } from 'react-router-dom';
import ImgLoader from '../ImgLoader';

function BookCard({ id, bookCover, title, author, genre }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
        console.log(isImageLoaded);
    };

    return (
        <Link
            to={'/books/' + id}
            className='bookcard w-72 p-6 bg-slate-100 rounded flex text-slate-800'
        >
            <div className='bookcard'>
                {!isImageLoaded && <ImgLoader w='60' h='96' />}

                <img
                    src={bookCover}
                    alt={title + ' cover'}
                    className='rounded object-cover w-64 h-96 hover:w-96'
                    onLoad={handleImageLoad}
                    style={{ display: isImageLoaded ? 'block' : 'none' }}
                />

                <h2 className='pt-5 pb-1 text-lg font-semibold'>{title}</h2>
                <p className='text-slate-600 text-sm'>by {author}</p>
                <p className='text-slate-600 text-xs font-light'>{genre}</p>
            </div>
        </Link>
    );
}

export default BookCard;
