import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'

const Add = () => {
  const [books, setBooks] = useState([])

  const location = useLocation({});

  const booklistID = location.pathname.split("/")[2];

    useEffect(()=>{
      //CAN'T CREATE ASYNC FUNCTION USING JUST useEFFECT SO WE MAKE ONE INSIDE
      //FETCHES BOOKS FROM DATABASE
      const fetchData = async() => {
        try {
          const res = await axios.get("/api/book/");
          setBooks(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);

    const handleAdd = async (bookID)=>{
        try{
          axios.post(`/api/booklist/${booklistID}/${bookID}`);
        } catch (err) {
          console.log(err, "Book was not added");
        }
    }
  
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
                          <button onClick={() => handleAdd(book.id)}>ADD</button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    )
}

export default Add