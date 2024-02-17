import React from "react";

function Customers() {
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">Customers</h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">ORDER IDs</th>
                <th scope="col">MOBILE</th>
                <th scope="col">PASSWORD</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>kuldip</td>
                <td>
                  <ul>
                    <li>342342</li>
                    <li>324324</li>
                  </ul>
                </td>
                <td>1234567876</td>
                <td>password</td>
                <td>
                  <button className="btn btn-danger">
                    <i className="bx bx-trash"></i>
                  </button>
                  &nbsp; &nbsp;
                  <button className="btn btn-warning">
                    <i className="bx bx-edit-alt"></i>
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

export default Customers;
