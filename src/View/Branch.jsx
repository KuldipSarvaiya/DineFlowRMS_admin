import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Branch() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fatchdata();
  }, []);

  const fatchdata = async () => {
    const res = await axios.get("/branch");
    console.log(res.data);
    setData(res.data.result);
  };
  async function deleteRecord(id) {
    const res = await axios.delete(`/branch/${id}`);
    console.log(res.data);
    fatchdata();
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage Branches</h5>
          <Link to="/add_branch">
          <button>Add Branch</button>
          </Link>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((branch, i) => (
                <tr key={i}>
                  <td>{++i}</td>
                  <td>{branch.branch_name}</td>
                  <td>{branch.branch_address}</td>
                  <td>{branch.branch_city}</td>
                  <td>
                    <Link to={'/edit_branch/'+branch.branch_no}><button>Edit</button></Link>
                    &nbsp;
                    <button onClick={() => deleteRecord(branch.branch_no)}>
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
