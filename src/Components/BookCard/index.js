import "./bookcard.css";
import { Link } from "react-router-dom";
import ImgLoader from "../ImgLoader";

function BookCard({ id, bookCover, title, author, genre }) {
    return (
        <Link to={"/books/" + id} className="bookcard w-72 p-6 bg-zinc-100 rounded flex text-slate-800">
            <div className="bookcard">
                <ImgLoader src={bookCover} alt={title + " cover"} w="60" h="96" />
                <h2>{title}</h2>
                <p className="text-slate-600 text-sm">by {author}</p>
                <p className="text-slate-600 text-xs font-light">{genre}</p>
            </div>
        </Link>
    );
}

export default BookCard;
