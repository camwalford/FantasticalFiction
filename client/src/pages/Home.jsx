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
            <h1>All Booklists</h1>
            {list.map(list=>(
                <div className="book" key={list.booklistID}>
                    <div className="content">
                            <h4>{list.booklistName} by {currentUser.username}</h4>
                            <h4>Total books read: </h4>
                        <Link className="link" to={`/booklist/${list.booklistID}`}>
                          <button>View List</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home