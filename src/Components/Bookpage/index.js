import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookDetails from './BookDetails'

function Bookpage() {
    const { id } = useParams()
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState('')
    const [pageCount, setPageCount] = useState('')
    const [genre, setGenre] = useState('')
    const [blurb, setBlurb] = useState('')
    const [error, setError] = useState(false)
    const [claimed, setClaimed] = useState(null)

    useEffect(() => {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books/' + id)
            .then((res) => res.json())
            .then((bookData) => {
                if (bookData.message !== 'Book successfully found') {
                    setError(true)
                } else {
                    setImage(bookData.data.image)
                    setTitle(bookData.data.title)
                    setAuthor(bookData.data.author)
                    setYear(bookData.data.year)
                    setPageCount(bookData.data.page_count)
                    setGenre(bookData.data.genre)
                    setBlurb(bookData.data.blurb)
                    setClaimed(bookData.data.claimed_by_name)
                }
            })
    }, [id, error])

    return (
        <div>
            {error ? (
                <p>Error, book not found</p>
            ) : (
                <BookDetails
                    image={image}
                    title={title}
                    author={author}
                    year={year}
                    pageCount={pageCount}
                    genre={genre}
                    blurb={blurb}
                    claimed={claimed}
                />
            )}
        </div>
    )
}

export default Bookpage