import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RestUser() {
  const { role, id } = useParams();
  const [data, setData] = useState({
    name: "",
    email_id: "",
    password: "",
    role_id: "",
    mobile: "",
  });
  const navigate = useNavigate();
  async function fetchData() {
    const res = await axios.get(`/employee/${id}`);
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
      res = await axios.put(`/employee/${id}`, {
        ...data,
        updated_by: 1,
        updated_by_role: 1,
      });
    else
      res = await axios.post(`/employee`, {
        ...data,
        entry_by: 1,
        entry_by_role: 1,
      });

    if (res.data) navigate(`/users_${role}s`, { replace: true });
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h1>Manage Restaurant User</h1>
          <form onSubmit={handleSubmit}>
            <div class="row mb-3">
              <label htmlFor="inputText" class="col-sm-2 col-form-label">
                Name
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.name}
                  onChange={handleChange}
                  type="text"
                  required
                  name="name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputEmail" class="col-sm-2 col-form-label">
                Email
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.email_id}
                  onChange={handleChange}
                  type="email"
                  required
                  name="email_id"
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
                  type="password"
                  required
                  name="password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputNumber" class="col-sm-2 col-form-label">
                Mobile No.
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.mobile}
                  onChange={handleChange}
                  type="tel"
                  required
                  name="mobile"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputNumber" class="col-sm-2 col-form-label">
                Role
              </label>
              <div class="col-sm-10">
                <input
                  // value={data?.role_id}
                  // onChange={handleChange}
                  type="tel"
                  required
                  name="role_id"
                  value={window.location.pathname.split("/")[2]}
                  class="form-control"
                />
              </div>
            </div>

            {/* <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Role</label>
              <div class="col-sm-10">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  required
                  name="role_id"
                >
                  <option selected="">assign role to user</option>
                  <option value="1">Admin</option>
                  <option value="2">Manager</option>
                  <option value="3">Waiter</option>
                  <option value="4">Chef</option>
                </select>
              </div>
            </div> */}

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

export default RestUser;
