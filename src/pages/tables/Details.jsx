import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Details() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/table");
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  async function deleteTable(id) {
    const res = await axios.delete(`/table/${id}`);
    if (res.data) fetchData();
  }

  const navigate = useNavigate();
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            Manage Restaurent Tables &nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => navigate(`/table`)}
              >
                <i className="bi bi-plus"></i> Add New Table
              </button>
            </span>
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">TABLE NO.</th>
                <th scope="col">CAPACITY</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((table, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{table.table_no}</td>
                    <td>{table.table_capacity}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/table/${table.table_id}`)}
                      >
                        <i className="bx bx-edit-alt"></i>
                      </button>
                      &nbsp; &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteTable(table.table_id)}
                      >
                        <i className="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Details;
