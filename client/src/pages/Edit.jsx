import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/authContext';


const Edit = () => {

    const [editedList, setEditedList] = useState([])

    //useState FOR CHANGING VALUES FOR currentStatus AND rating
    // const [status, setStatus] = useState({
    //   currentStatus: "",
    //   rating:""
    // })

    const location = useLocation({});

    const listId = location.pathname.split("/")[2];

    console.log(editedList);

    useEffect(()=>{
      //CAN'T CREATE ASYNC FUNCTION USING JUST useEFFECT SO WE MAKE ONE INSIDE
      const fetchData = async () => {
        try {
          const res = await axios.get(`/api/booklist/${listId}`);
          setEditedList(res.data);
          console.log(res.data);
          //setStatus(res.data.currentStatus, res.data.rating); 
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);


    //DELETES LIST ITEM
    const handleDelete = async(bookID) => {
      try {
        const res = await axios.delete(`/api/booklist/${listId}/${bookID}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }

    const handleChange = async(e)=> {
      setEditedList(prev=>({...prev, [e.target.name]: e.target.value}));
    };

  
  return (
      <div className='single-list'>
        <div className="options">
            <Link to={`/booklist/${listId}`}><button className="add">SAVE CHANGES</button></Link>
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
            {editedList.map(book => (
                <tr className="listBook" key={book.bookID}>
                  <td><Link className='link' to={`/book/${book.bookID}`}>{book.title}</Link></td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    <select name="currentStatus" value={`${book.currentStatus}`} onChange={handleChange}>
                      <option>plan to read</option>
                      <option>currently reading</option>
                      <option>completed</option>
                    </select>
                  </td>
                  <td>
                    {/* <select name="currentStatus" value={`${status.rating}`} onChange={handleChange}>
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
                    </select> */}
                  </td>
                  <td><button onClick={()=>handleDelete(book.bookID)}>Delete</button></td>
                </tr>
              ))}  
              
          </tbody>
        </table>
      </div>
    )
}

export default Edit