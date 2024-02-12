import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Transaction() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fatchdata();
  }, []);

  const fatchdata = async () => {
    const res = await axios.get("/transaction");
    console.log(res.data);
    setData(res.data.result);
  };
  async function deleteRecord(id) {
    const res = await axios.delete(`/transaction/${id}`);
    console.log(res.data);
    fatchdata();
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Manage Transactions</h5>
          <Link to="/add_transaction">
          <button>Add Transaction</button>
          </Link>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>TransactionID</th>
                <th>Acc No.</th>
                <th>Branch No.</th>
                <th>Amount</th>
                <th>Tran. Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tran, i) => (
                <tr key={i}>
                  <td>{tran.tran_id}</td>
                  <td>{tran.acc_no}</td>
                  <td>{tran.branch_no}</td>
                  <td>{tran.tran_amount}</td>
                  <td>{new Date(tran.tran_date).toDateString()}</td>
                  <td>
                    <Link to={'/edit_transaction/'+tran.tran_id}><button>Edit</button></Link>
                    &nbsp;
                    <button onClick={() => deleteRecord(tran.tran_id)}>
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
