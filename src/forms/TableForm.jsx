import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TableForm() {
  const { id } = useParams();
  const [data, setData] = useState({
    table_no: "",
    table_capacity: 0,
  });
  const navigate = useNavigate();

  async function fetchData() {
    const res = await axios.get(`/table/${id}`);
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
      res = await axios.put(`/table/${id}`, {
        ...data,
        updated_by: 1,
        updated_by_role: 1,
      });
    else
      res = await axios.post(`/table`, {
        ...data,
        entry_by: 1,
        entry_by_role: 1,
      });

    if (res.data) navigate("/table_details", { replace: true });
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h1>Manage Table</h1>
          <form onSubmit={handleSubmit}>
            <div class="row mb-3">
              <label htmlFor="inputText" class="col-sm-2 col-form-label">
                Table Number
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.table_no}
                  onChange={handleChange}
                  required
                  type="text"
                  name="table_no"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputNumber" class="col-sm-2 col-form-label">
                Table Capacity
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.table_capacity}
                  onChange={handleChange}
                  required
                  type="number"
                  name="table_capacity"
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

export default TableForm;
