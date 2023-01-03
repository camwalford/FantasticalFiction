import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/authContext';


const List = () => {

    const [list, setList] = useState([])

    const {currentUser} = useContext(AuthContext);

    const uid = currentUser?.id;

    const location = useLocation({});

    const listId = location.pathname.split("/")[2];

    console.log(list);

    useEffect(()=>{
      //CAN'T CREATE ASYNC FUNCTION USING JUST useEFFECT SO WE MAKE ONE INSIDE
      const fetchData = async () => {
        try {
          const res = await axios.get(`/api/booklist/${listId}`);
          setList(res.data);
          
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [listId]);
  return (
      <div className='single-book'>
        <div className="content">
          <img className="cover" src ="http://bookcoverarchive.com/wp-content/uploads/2020/07/The-Everlasting-final-cover.jpg" alt="cover"/>
        </div>
        <div className="author">
  
        </div>
        <div className="description">
          
        </div>
        <div className="menu">menu</div>
      </div>
    )
}

export default List