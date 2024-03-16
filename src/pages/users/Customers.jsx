import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../AppState";

function Customers() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { appData } = useContext(context);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/customer");
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  async function deleteCustomer(id) {
    const res = await axios.delete(`/customer/${id}`);
    if (res.data) fetchData();
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            Manage Restaurent Customer &nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => navigate(`/customer`)}
              >
                <i className="bi bi-plus"></i> Add New Customer
              </button>
            </span>
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">MOBILE</th>
                <th scope="col">PASSWORD</th>
                {appData?.auth.role_id <= 2 && <th scope="col">ACTION</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.mobile_no}</td>
                    <td>{user.password}</td>
                    {appData?.auth.role_id <= 2 && (
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            navigate(`/customer/${user.customer_id}`)
                          }
                        >
                          <i className="bx bx-edit-alt"></i>
                        </button>
                        &nbsp; &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCustomer(user.customer_id)}
                        >
                          <i className="bx bx-trash"></i>
                        </button>
                      </td>
                    )}
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

export default Customers;
