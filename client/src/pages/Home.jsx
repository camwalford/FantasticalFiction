import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

    const books = [
        {
            id: 1,
            title:"lorem ipsum",
            desc:"lorem ipusaksfda;slkdj ",
            cover:'https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg'
        },
        {
            id: 1,
            title:"lorem ipsum",
            desc:"lorem ipusaksfda;slkdj ",
            cover:'https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg'
        },
        {
            id: 1,
            title:"lorem ipsum",
            desc:"lorem ipusaksfda;slkdj ",
            cover:'https://covers.openlibrary.org/b/isbn/9780385533225-S.jpg'
        },
    ];
  return (
    <div className="home">
        <div className="books">
            {books.map(book=>(
                <div className="book" key={book.id}>
                    <div className='cover'>
                        <img src={book.cover} alt="cover" />
                    </div>
                    <div className="content">
                        <Link className="link" to={`/book/${book.id}`}>
                            <h1>{book.title}</h1>
                        </Link>
                        <p>{book.desc}</p>
                        <button>Read more</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home