import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    is_available: "",
    name: "",
    author: "",
    student_id: "",
  });
  const [err, setErr] = useState({
    is_available: "",
    name: "",
    author: "",
    student_id: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    id && fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/book/" + id);
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
    if (data.is_available === "") {
      isErr = true;
      error["is_available"] = "Please Select This Field";
    }
    if (data.name.trim() === "") {
      isErr = true;
      error["name"] = "Please Enter This Field";
    }
    if (data.author.trim() === "") {
      isErr = true;
      error["author"] = "Please Enter This Field";
    }
    if (data.student_id.trim() === "") {
      isErr = true;
      error["student_id"] = "Please Enter This Field";
    }
    if (isErr)
      setErr((prev) => {
        return { ...error };
      });

    return isErr;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateSubmit()) return;
    setLoading(true);
    try {
      let res;
      id
        ? (res = await axios.put(`/book/${id}`, { ...data }))
        : (res = await axios.post(`/book`, { ...data }));
      !res.data.error && alert("Record Inserted Successfully");
      navigate("/book");
    } catch (error) {
      alert("Failed Insert Record, Open Console for Error");
      console.error(error);
    }
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New Book</h5>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Book Name
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.name}
                  onChange={handleChange}
                  name="name"
                  type="text"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.name}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Author Name
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.author}
                  onChange={handleChange}
                  name="author"
                  type="text"
                  className="form-control"
                  id="inputEmail"
                />
                <p style={{ color: "red" }}>{err.author}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Student ID, who Borrowed Book
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.student_id}
                  onChange={handleChange}
                  name="student_id"
                  type="nember"
                  className="form-control"
                  id="inputPassword"
                />
                <p style={{ color: "red" }}>{err.student_id}</p>
              </div>
            </div>
            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">
                Is Book Available to Borrow ?
              </legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    checked={data.is_available === 1}
                    onChange={handleChange}
                    class="form-check-input"
                    type="radio"
                    name="is_available"
                    id="gridRadios1"
                    value={1}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Yess
                  </label>
                </div>
                <div class="form-check">
                  <input
                    checked={data.is_available === 0}
                    onChange={handleChange}
                    class="form-check-input"
                    type="radio"
                    name="is_available"
                    id="gridRadios2"
                    value={0}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    Noo
                  </label>
                </div>
                <p style={{ color: "red" }}>{err.is_available}</p>
              </div>
            </fieldset>
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

export default AddBook;
