import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/authContext';


const List = () => {

    

    const [list, setList] = useState([])

    const {currentUser} = useContext(AuthContext);

    const username = currentUser?.username;

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

    //DELETES LIST ITEM
    const handleDelete = async(bookID) => {
      try {
        const res = await axios.delete(`/api/booklist/${listId}/${bookID}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }

  
  return (
      <div className='single-list'>
        <div className="options">
            <Link to={`/booklist/${listId}/add`}><button className="add">ADD</button></Link>
            <div className="edit">EDIT</div>
            <div className="delete">DELETE</div>
        </div>
        <div className="listOwner">
        </div>
        <table className="content">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Rating</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(book => (
                <tr className="listBook" key={book.bookID}>
                  <td><Link className='link' to={`/book/${book.bookID}`}>{book.title}</Link></td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.currentStatus}</td>
                  <td>{book.rating}</td>
                  <td>Edit</td>
                  <td><button onClick={()=>handleDelete(book.bookID)}>Delete</button></td>
                </tr>
              ))}  
              
          </tbody>
        </table>
      </div>
    )
}

export default List