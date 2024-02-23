import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Chefs() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/employee?role_id=4");
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  async function deleteChef(id) {
    const res = await axios.delete(`/employee/${id}`);
    if (res.data) fetchData();
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            Manage Restaurent Chef &nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => navigate(`/user/chef`)}
              >
                <i className="bi bi-plus"></i> Add New Chef
              </button>
            </span>
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">MOBILE</th>
                <th scope="col">EMAIL</th>
                <th scope="col">PASSWORD</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
            {data.map((user, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.mobile}</td>
                    <td>{user.email_id}</td>
                    <td>{user.password}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          navigate(`/user/chef/${user.employee_id}`)
                        }
                      >
                        <i className="bx bx-edit-alt"></i>
                      </button>
                      &nbsp; &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteChef(user.employee_id)}
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

export default Chefs;
