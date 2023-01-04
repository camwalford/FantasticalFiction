import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/authContext';


const List = () => {

    

    const [list, setList] = useState([]);

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

    const handleChange = async(e, bookID) => {
      const change = [e.target.name, e.target.value];
      console.log(change, bookID);
      console.log(change[0]);
       try {
         const res = await axios.put(`/api/booklist/${listId}/${bookID}/${change[0]}/${change[1]}`);
         
       } catch (err) {
         console.log(err);
       }
    }

  
  return (
      <div className='single-list'>
        <div className="options">
        {(currentUser.booklistID == listId)?(
            <Link to={`/booklist/${listId}/add`}><button className="add">ADD BOOKS</button></Link>
        ): (<div></div>)}
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
            </tr>
          </thead>
          <tbody>
            {list.map(book => (
                <tr className="listBook" key={book.bookID}>
                  <td><Link className='link' to={`/book/${book.bookID}`}>{book.title}</Link></td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  {(currentUser.booklistID == listId)?(
                    <td>
                      <select name="currentStatus" onChange={(e) => handleChange(e, book.bookID)} defaultValue={book.currentStatus}>
                        <option value="plan to read">plan to read</option>
                        <option value="currently reading">currently reading</option>
                        <option value="completed">completed</option>
                      </select>
                    </td>) : (<td>{book.currentStatus}</td>) }
                  {(currentUser.booklistID == listId)?(
                    <td>
                      <select name="rating" onChange={(e) => handleChange(e, book.bookID)} defaultValue={`${book.rating}`}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </select>
                    </td>): (<td>{book.rating}</td>)}
                    {(currentUser.booklistID == listId)?(
                    <td>
                      <button onClick={()=>handleDelete(book.bookID)}>Delete</button>
                    </td>): (<td></td>)}
                </tr>
              ))}  
              
          </tbody>
        </table>
      </div>
    )
}

export default List