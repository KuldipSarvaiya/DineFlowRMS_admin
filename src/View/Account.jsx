import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Account() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fatchdata();
  }, []);

  const fatchdata = async () => {
    const res = await axios.get("/account");
    console.log(res.data);
    setData(res.data.result);
  };
  async function deleteRecord(id) {
    const res = await axios.delete(`/account/${id}`);
    console.log(res.data);
    fatchdata();
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage Accounts</h5>
          <Link to="/add_account">
          <button>Add Account</button>
          </Link>

          <table className="table table-striped">
            <thead>
              <tr>
                <td>No.</td>
                <td>Acc Holder</td>
                <td>DOB</td>
                <td>Acc OP Date</td>
                <td>Balance</td>
                <td>Acc Type</td>
                <td>Acc Status</td>
                <td>Gender</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {data.map((acc, i) => (
                <tr key={i}>
                  <td>{++i}</td>
                  <th>{acc.acc_holder_name}</th>
                  <th>{new Date(acc.acc_holder_dob).toDateString()}</th>
                  <th>{new Date(acc.acc_op_date).toDateString()}</th>
                  <th>{acc.acc_balance}</th>
                  <th>{acc.acc_type.toUpperCase()}</th>
                  <th>{acc.acc_status.toUpperCase()}</th>
                  <th>{acc.acc_holder_gender.toUpperCase()}</th>
                  <td>
                    <Link to={'/edit_account/'+acc.acc_no}><button>Edit</button></Link>
                    &nbsp;
                    <button onClick={() => deleteRecord(acc.acc_no)}>
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
