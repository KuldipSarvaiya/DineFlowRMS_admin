import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddAccount() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    acc_holder_name: "",
    acc_holder_dob: "",
    acc_balance: "",
    acc_status: "",
    acc_type: "",
    acc_holder_gender: "",
  });
  const [err, setErr] = useState({
    acc_holder_name: "",
    acc_holder_dob: "",
    acc_balance: "",
    acc_status: "",
    acc_type: "",
    acc_holder_gender: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    id && fetchStudents();
  }, []);

  function validateSubmit() {
    let error = {};
    let isErr = false;
    if (data.acc_holder_name.trim() === "") {
      isErr = true;
      error["acc_holder_name"] = "Enter Account Holder Name before Submit";
    }
    if (data.acc_balance === "") {
      isErr = true;
      error["acc_balance"] = "Enter Account Balance before Submit";
    }
    if (data.acc_status === "") {
      isErr = true;
      error["acc_status"] = "Select Account Status before Submit";
    }
    if (data.acc_type === "") {
      isErr = true;
      error["acc_type"] = "Select Account Type before Submit";
    }
    if (data.acc_holder_gender === "") {
      isErr = true;
      error["acc_holder_gender"] = "Select Gender before Submit";
    }
    if (data.acc_holder_dob === "") {
      isErr = true;
      error["acc_holder_dob"] = "Select DOB before Submit";
    }
    console.log(error);
    if (isErr)
      setErr((prev) => {
        return { ...error };
      });

    return isErr;
  }

  const fetchStudents = async () => {
    const res = await axios.get("/account/" + id);
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

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting...");
    if (validateSubmit()) return false;
    console.log("2 submitting...");
    setLoading(true);
    try {
      let res;
      id
        ? (res = await axios.put(`/account/${id}`, { ...data }))
        : (res = await axios.post(`/account`, { ...data }));
      !res.data.error && alert("Record Inserted Successfully");
      navigate("/account");
    } catch (error) {
      alert("Failed Insert Record, Open Console for Error");
      console.error(error);
    }
  }
  return (
    <main id="main" className="main">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New Account</h5>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Your Name
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.acc_holder_name}
                  onChange={handleChange}
                  name="acc_holder_name"
                  type="text"
                  className="form-control"
                  id="inputText"
                />
                <p style={{ color: "red" }}>{err.acc_holder_name}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Your Date Of Birth
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={new Date(data.acc_holder_dob)}
                  onChange={handleChange}
                  name="acc_holder_dob"
                  type="date"
                  className="form-control"
                  id="inputEmail"
                />
                <p style={{ color: "red" }}>{err.acc_holder_dob}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPassword3"
                className="col-sm-2 col-form-label"
              >
                Enter Balance
              </label>
              <div className="col-sm-10">
                <input
                  defaultValue={data.acc_balance}
                  onChange={handleChange}
                  name="acc_balance"
                  type="number"
                  className="form-control"
                  id="inputPassword"
                />
                <p style={{ color: "red" }}>{err.acc_balance}</p>
              </div>
            </div>
            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">
                Account Status
              </legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    checked={data.acc_status === "o"}
                    onChange={handleChange}
                    class="form-check-input"
                    type="radio"
                    name="acc_status"
                    id="gridRadios1"
                    value={"o"}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Open :{" "}
                  </label>
                </div>
                <div class="form-check">
                  <input
                    checked={data.acc_status === "c"}
                    onChange={handleChange}
                    class="form-check-input"
                    type="radio"
                    name="acc_status"
                    id="gridRadios2"
                    value={"c"}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    Close :{" "}
                  </label>
                  <p style={{ color: "red" }}>{err.acc_status}</p>
                </div>
              </div>
            </fieldset>
            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">
                Select Account Type
              </legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    checked={data.acc_type === "s"}
                    onChange={handleChange}
                    class="form-check-input"
                    type="radio"
                    name="acc_type"
                    id="gridRadios1"
                    value={"s"}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Saving :{" "}
                  </label>
                </div>
                <div class="form-check">
                  <input
                    checked={data.acc_type === "c"}
                    onChange={handleChange}
                    class="form-check-input"
                    type="radio"
                    name="acc_type"
                    id="gridRadios2"
                    value={"c"}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    Current :{" "}
                  </label>
                  <p style={{ color: "red" }}>{err.acc_type}</p>
                </div>
              </div>
            </fieldset>
            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">Sele Gender</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    checked={data.acc_holder_gender === "m"}
                    onChange={handleChange}
                    class="form-check-input"
                    type="radio"
                    name="acc_holder_gender"
                    id="gridRadios1"
                    value={"m"}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Male
                  </label>
                </div>
                <div class="form-check">
                  <input
                    checked={data.acc_holder_gender === "f"}
                    onChange={handleChange}
                    class="form-check-input"
                    type="radio"
                    name="acc_holder_gender"
                    id="gridRadios2"
                    value={"f"}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    Female
                  </label>
                  <p style={{ color: "red" }}>{err.acc_holder_gender}</p>
                </div>
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

export default AddAccount;
