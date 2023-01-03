import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/authContext';


const Home = () => {

    const [list, setList] = useState([])

    const {currentUser} = useContext(AuthContext);

    const uid = currentUser?.id;

    console.log(list);

    useEffect(()=>{
      //CAN'T CREATE ASYNC FUNCTION USING JUST useEFFECT SO WE MAKE ONE INSIDE
      const fetchData = async () => {
        try {
          const res = await axios.get(`/api/booklist/`);
          setList(res.data);
          
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);
  return (
    <div className="home">
        <div className="books">
            {list.map(list=>(
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

export default Home