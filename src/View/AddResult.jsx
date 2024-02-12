import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddResult() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    student_id: "",
    semester: "",
    sub_1: "",
    sub_2: "",
    sub_3: "",
  });
  const [err, setErr] = useState({
    student_id: "",
    semester: "",
    sub_1: "",
    sub_2: "",
    sub_3: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    id && fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/result/" + id);
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
    if (data.student_id.trim() === "") {
      isErr = true;
      error["student_id"] = "Please Enter This Field";
    }
    if (data.semester.trim() === "") {
      isErr = true;
      error["semester"] = "Please Enter This Field";
    }
    if (data.sub_1.trim() === "") {
      isErr = true;
      error["sub_1"] = "Please Enter This Field";
    }
    if (data.sub_2.trim() === "") {
      isErr = true;
      error["sub_2"] = "Please Enter This Field";
    }
    if (data.sub_3.trim() === "") {
      isErr = true;
      error["sub_3"] = "Please Enter This Field";
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
        ? (res = await axios.put(`/result/${id}`, { ...data }))
        : (res = await axios.post(`/result`, { ...data }));
      !res.data.error && alert("Record Inserted Successfully");
      navigate("/result");
    } catch (error) {
      alert("Failed Insert Record, Open Console for Error");
      console.error(error);
    }
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New Result</h5>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Student ID
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.student_id}
                  onChange={handleChange}
                  name="student_id"
                  type="number"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.student_id}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Semester
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.semester}
                  onChange={handleChange}
                  name="semester"
                  type="number"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.semester}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Subject 1
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.sub_1}
                  onChange={handleChange}
                  name="sub_1"
                  type="number"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.sub_1}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Subject 2
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.sub_2}
                  onChange={handleChange}
                  name="sub_2"
                  type="number"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.sub_2}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Subject 3
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.sub_3}
                  onChange={handleChange}
                  name="sub_3"
                  type="number"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.sub_3}</p>
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

export default AddResult;
