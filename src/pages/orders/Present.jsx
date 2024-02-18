import React from "react";
import { useNavigate } from "react-router-dom";

function Present() {
  const navigate = useNavigate();
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h6 className="card-title">Current Orders</h6>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">CUSTOMER</th>
                <th scope="col">DATE</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{1}</td>
                <td>{2345678}</td>
                <td>{"John Doe"}</td>
                <th scope="row">
                  <span>{new Date().toLocaleDateString()}</span>
                </th>
                <td>
                  {/* &nbsp; &nbsp;
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/order_edit/${111}`)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button> */}
                  <button
                    className="btn btn-success"
                    onClick={() => alert("now customer can order")}
                  >
                    <i className="bx bx-check">Allow Orders</i>
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      alert("order deleted");
                    }}
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Present;
