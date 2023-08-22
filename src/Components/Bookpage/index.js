import { useEffect } from "react"
import { useParams } from "react-router-dom"

function Bookpage() {

    const {id} = useParams()

    useEffect(() => {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books/' + id)
            .then(res => res.json())
            .then(bookData => {
                console.log(bookData)
            })
    },[])

    return (
        <p>Bookpage</p>
    )
}

export default Bookpage