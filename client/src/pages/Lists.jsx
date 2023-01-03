import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Lists = ()=> {

  const [lists, setLists] = useState([])

  console.log(lists);

  useEffect(()=>{
    //CAN'T CREATE ASYNC FUNCTION USING JUST useEFFECT SO WE MAKE ONE INSIDE
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/booklist");
        setLists(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
return (
  <div className="home">
      <div className="books">
          {lists.map(list=>(
              <div className="book" key={list.booklistID}>
                  <div className="content">
                      <Link className="link" to={`/booklist/${list.booklistID}`}>
                          <h1>{list.booklistName}</h1>
                          <h1>{list.username}</h1>
                      </Link>
                      <p>{list.description}</p>
                      <button>Read more</button>
                  </div>
              </div>
          ))}
      </div>
  </div>
)
}

export default Lists