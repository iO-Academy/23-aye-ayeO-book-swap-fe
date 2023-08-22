function BookDetails({image, title, author, year, pageCount, genre, blurb}) {
    return ( 
        <>
            <div>
                <img src={image} alt={'Cover of ' + title} />
            </div>
            <div>
                <h2>{title}</h2>
                <p>{author}</p>
                <p>{year}</p>
                <p>{pageCount}</p>
                <p>{genre.name}</p>
                <p>{blurb}</p>
            </div>
        </>
    )
}

export default BookDetails