import React from "react";

function Waiters() {
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">Restaurent Waiters</h5>

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
              <tr>
                <td>1</td>
                <td>kuldip</td>
                <td>1234567876</td>
                <td>kuldip@gmail.com</td>
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

export default Waiters;
