import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookDetails from "./BookDetails"

function Bookpage() {

    const {id} = useParams()
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [year, setYear] = useState('')
    const [pageCount, setPageCount] = useState('')
    const [genre, setGenre] = useState('')
    const [blurb, setBlurb] = useState('')
    // const [error, setError] = useState(false)

    useEffect(() => {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books/' + id)
            .then(res => res.json())
            .then(bookData => {
                console.log(bookData)
                setImage(bookData.data.image)
                setTitle(bookData.data.title)
                setAuthor(bookData.data.author)
                setYear(bookData.data.year)
                setPageCount(bookData.data.page_count)
                setGenre(bookData.data.genre)
                setBlurb(bookData.data.blurb)
                
            })
    },[])

    return (
        <div>
            <BookDetails image={image} title={title} author={author} year={year} pageCount={pageCount} genre={genre} blurb={blurb} />
        </div>
    )
}

export default Bookpage