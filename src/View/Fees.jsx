import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Fees() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fatchdata();
  }, []);

  const fatchdata = async () => {
    const res = await axios.get("/fees");
    console.log(res.data);
    setData(res.data.result);
  };
  async function deleteRecord(id) {
    const res = await axios.delete(`/fees/${id}`);
    console.log(res.data);
    fatchdata();
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage Fees</h5>
          <Link to="/add_fees">
          <button>Add Fee</button>
          </Link>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>StudentID</th>
                <th>Fees Amount</th>
                <th>Semester</th>
                <th>Paid Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, i) => (
                <tr key={i}>
                  <td>{student.student_id}</td>
                  <td>{student.fees_amount}</td>
                  <td>{student.semester}</td>
                  <td>{new Date(student.date).toDateString()}</td>
                  <td> 
                    <Link to={'/edit_fees/'+student.student_id}><button>Edit</button></Link>
                    &nbsp;
                    <button onClick={() => deleteRecord(student.student_id)}>
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
