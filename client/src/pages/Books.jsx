import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(()=>{
      //CAN'T CREATE ASYNC FUNCTION USING JUST useEFFECT SO WE MAKE ONE INSIDE
      //FETCHES BOOKS FROM DATABASE
      const fetchData = async () => {
        try {
          const res = await axios.get("/api/book/");
          setBooks(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
  
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


export default Books