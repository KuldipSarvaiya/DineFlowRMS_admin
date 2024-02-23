import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CustomerForm() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    mobile_no: "",
    password: "",
  });
  const navigate = useNavigate();

  async function fetchData() {
    const res = await axios.get(`/customer/${id}`);
    if (res.data) setData(res.data[0]);
  }

  useEffect(() => {
    if (id) fetchData();
  }, []);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let res = null;
    if (id)
      res = await axios.put(`/customer/${id}`, {
        ...data,
        updated_by: 1,
        updated_by_role: 1,
      });
    else
      res = await axios.post(`/customer`, {
        ...data,
        entry_by: 1,
        entry_by_role: 1,
      });

    if (res.data) navigate("/users_customers", { replace: true });
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h1>Manage Customers</h1>
          <form onSubmit={handleSubmit}>
            <div class="row mb-3">
              <label htmlFor="inputText" class="col-sm-2 col-form-label">
                Name
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.name}
                  onChange={handleChange}
                  required
                  name="name"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputNumber" class="col-sm-2 col-form-label">
                Mobile Number
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.mobile_no}
                  onChange={handleChange}
                  required
                  type="tel"
                  name="mobile_no"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputPassword" class="col-sm-2 col-form-label">
                Password
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.password}
                  onChange={handleChange}
                  required
                  type="password"
                  name="password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Submit Form</label>
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
