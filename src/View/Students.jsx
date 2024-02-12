import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/student");
    console.log(res.data);
    setStudents(res.data);
  };
  async function deleteRecord(id) {
    const res = await axios.delete(`/student/${id}`);
    console.log(res.data);
    fetchStudents();
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage Students</h5>
          <Link to="/add_student">
            <button>Add Student</button>
          </Link>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={i}>
                  <td>{++i}</td>
                  <td>{student.student_name}</td>
                  <td>{student.student_mobile}</td>
                  <td>{student.student_email}</td>
                  {/* <td>{student.student_img}</td> */}
                  <td>
                    <img
                      src={`http://localhost:1001/image/${student.student_img}`}
                      height={100}
                      width={100}
                    />
                  </td>
                  {/* {console.log(student.student_img)} */}
                  <td>
                    <Link to={"/edit_student/" + student.student_id}>
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
