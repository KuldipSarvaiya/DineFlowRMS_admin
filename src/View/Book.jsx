import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Book() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fatchdata();
  }, []);

  const fatchdata = async () => {
    const res = await axios.get("/book");
    console.log(res.data);
    setData(res.data.result);
  };
  async function deleteRecord(id) {
    const res = await axios.delete(`/book/${id}`);
    console.log(res.data);
    fatchdata();
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage Books</h5>
          <Link to="/add_book">
          <button>Add Book</button>
          </Link>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Borrowed by StudentID</th>
                <th>Is Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((book, i) => (
                <tr key={i}>
                  <td>{++i}</td> 
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.student_id}</td>
                  <td>{+book.is_available ? "Yes" : "No"}</td>
                  <td>
                    <Link to={'/edit_book/'+book.name}><button>Edit</button></Link>
                    &nbsp;
                    <button onClick={() => deleteRecord(book.name)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
