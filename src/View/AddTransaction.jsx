import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddTransaction() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    acc_no: "",
    branch_no: "",
    tran_amount: "",
  });
  const [err, setErr] = useState({
    acc_no: "",
    branch_no: "",
    tran_amount: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    id && fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/transaction/" + id);
    console.log(res.data);
    setData(res.data.result[0]);
  };

  function handleChange(event) {
    loading && setLoading(false);

    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function validateSubmit() {
    console.log('validating...');
    const error = {};
    let isErr = false;
    if (data.acc_no === "") {
      isErr = true;
      error["acc_no"] = "Please Enter This Field";
    }
    if (data.branch_no === "") {
      isErr = true;
      error["branch_no"] = "Please Enter This Field";
    }
    if (data.tran_amount === "") {
      isErr = true;
      error["tran_amount"] = "Please Enter This Field";
    }
    if (isErr) setErr(error);

    return isErr;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('submitting...');
    if (validateSubmit()) return;
    setLoading(true);
    try {
      let res;
      id
        ? (res = await axios.put(`/transaction/${id}`, { ...data }))
        : (res = await axios.post(`/transaction`, { ...data }));
      !res.data.error && alert("Record Inserted Successfully");
      navigate("/transaction");
    } catch (error) {
      alert("Failed Insert Record, Open Console for Error");
      console.error(error);
    }
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New Transaction</h5>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Your Account Number
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.acc_no}
                  onChange={handleChange}
                  name="acc_no"
                  type="text"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.acc_no}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Your Branch Number
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.branch_no}
                  onChange={handleChange}
                  name="branch_no"
                  type="text"
                  className="form-control"
                  id="inputEmail"
                />
                <p style={{ color: "red" }}>{err.branch_no}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Transaction Amount
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.tran_amount}
                  onChange={handleChange} 
                  name="tran_amount"
                  type="number"
                  className="form-control"
                  id="inputPassword"
                />
                <p style={{ color: "red" }}>{err.tran_amount}</p>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Submit
              </button>
              &nbsp;
              <button
                type="reset"
                className="btn btn-secondary" 
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddTransaction;
