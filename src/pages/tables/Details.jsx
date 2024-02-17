import React from "react";

function Details() {
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            Manage Table Details <span></span>
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
              <tr>
                <td>1</td>
                <td>101</td>
                <td>4</td>
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

export default Details;