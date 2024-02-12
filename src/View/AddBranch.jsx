import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddBranch() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    branch_name: "",
    branch_address: "",
    branch_city: "",
  });
  const [err, setErr] = useState({
    branch_name: "",
    branch_address: "",
    branch_city: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    id && fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/branch/" + id);
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
    const error = {};
    let isErr = false;
    if (data.branch_name.trim() === "") {
      isErr = true;
      error["branch_name"] = "Please Enter This Field";
    }
    if (data.branch_address.trim() === "") {
      isErr = true;
      error["branch_address"] = "Please Enter This Field";
    }
    if (data.branch_city.trim() === "") {
      isErr = true;
      error["branch_city"] = "Please Enter This Field";
    }
    if (isErr) setErr(error);

    return isErr;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateSubmit()) return;
    setLoading(true);
    try {
      let res;
      id
        ? (res = await axios.put(`/branch/${id}`, { ...data }))
        : (res = await axios.post(`/branch`, { ...data }));
      !res.data.error && alert("Record Inserted Successfully");
      navigate("/branch");
    } catch (error) {
      alert("Failed Insert Record, Open Console for Error");
      console.error(error);
    }
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New Branch</h5>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Branch Name
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.branch_name}
                  onChange={handleChange}
                  name="branch_name"
                  type="text"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.branch_name}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Branch Address
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.branch_address}
                  onChange={handleChange}
                  name="branch_address"
                  type="text"
                  className="form-control"
                  id="inputEmail"
                />
                <p style={{ color: "red" }}>{err.branch_address}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Branch City
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.branch_city}
                  onChange={handleChange}
                  name="branch_city"
                  type="text"
                  className="form-control"
                  id="inputPassword"
                />
                <p style={{ color: "red" }}>{err.branch_city}</p>
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
                disabled={loading}
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

export default AddBranch;
