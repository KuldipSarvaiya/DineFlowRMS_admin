import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    student_name: "",
    student_mobile: "",
    student_email: "",
    student_img: "",
  });
  const [err, setErr] = useState({
    student_name: "",
    student_mobile: "",
    student_email: "",
    student_img: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    id && fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/student/" + id);
    console.log(res.data);
    setData(res.data[0]);
  };

  function handleChange(event) {
    loading && setLoading(false);

    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => {
      return {
        ...prev,
        [name]: name === "student_img" ? event.target.files[0] : value,
      };
    });
  }

  function validateSubmit() {
    const error = {};
    let isErr = false;
    if (data.student_name.trim() === "") {
      isErr = true;
      error["student_name"] = "Please Enter This Field";
    } 
    if (data.student_img === "") {
      isErr = true;
      error["student_img"] = "Please Enter This Field";
    } 
    if (data.student_mobile.trim() === "") {
      isErr = true;
      error["student_mobile"] = "Please Enter This Field";
    } 
    if (data.student_email.trim() === "") {
      isErr = true;
      error["student_email"] = "Please Enter This Field";
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
        ? (res = await axios.put(
            `/student/${id}`,
            { ...data },
            { headers: { "Content-Type": "multipart/form-data" } }
          ))
        : (res = await axios.post(
            `/student`,
            { ...data },
            { headers: { "Content-Type": "multipart/form-data" } }
          ));
      !res.data.error && alert("Record Inserted Successfully");
      navigate("/student");
    } catch (error) {
      alert("Failed Insert Record, Open Console for Error");
      console.error(error);
    }
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New Student</h5>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Your Name
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.student_name}
                  onChange={handleChange}
                  name="student_name"
                  type="text"
                  className="form-control"
                  id="inputText"
                />
                <p style={{color:'red'}}>{err.student_name}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Your Email
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.student_email}
                  onChange={handleChange}
                  name="student_email"
                  type="email"
                  className="form-control"
                  id="inputEmail"
                />
                <p style={{color:'red'}}>{err.student_email}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Your Mobile
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.student_mobile}
                  onChange={handleChange}
                  name="student_mobile"
                  type="tel"
                  className="form-control"
                  id="inputPassword"
                />
                <p style={{color:'red'}}>{err.student_mobile}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Your Image
              </label>

              <div className="col-sm-10">
                <input
                  onChange={handleChange}
                  name="student_img"
                  type="file"
                  className="custom-file"
                  id="student_img"
                />
                <p style={{color:'red'}}>{err.student_img}</p>
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

export default AddStudent;
