import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Result() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fatchdata();
  }, []);

  const fatchdata = async () => {
    const res = await axios.get("/result");
    console.log(res.data);
    setData(res.data.result);
  };
  async function deleteRecord(id) {
    const res = await axios.delete(`/result/${id}`);
    console.log(res.data);
    fatchdata();
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage Results</h5>

          <Link to="/add_result">
            <button>Add Result</button>
          </Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>StudentID</th>
                <th>Semester</th>
                <th>Subject 1</th>
                <th>Subject 2</th>
                <th>Subject 3</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, i) => (
                <tr key={i}>
                  <td>{student.student_id}</td>
                  <td>{student.semester}</td>
                  <td>{student.sub_1}</td>
                  <td>{student.sub_2}</td>
                  <td>{student.sub_3}</td>
                  <td>
                    <Link to={"/edit_result/" + student.student_id}>
                      <button>Edit</button>
                    </Link>
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
