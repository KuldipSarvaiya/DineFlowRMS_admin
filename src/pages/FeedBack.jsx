import React from "react";

function FeedBack() {
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            FeedBack <span></span>
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">CUSTOMER</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">FEEDBACK</th>
                <th scope="col">RATING</th>
                <th scope="col">DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <a href="#">1</a>
                </th>
                <td>Brandon Jacob</td>
                <td>123456yu</td>
                <td>this is very good and like this item</td>
                <td>
                  <span className="badge bg-success">4.5</span>
                </td>
                <td>{new Date().toDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeedBack;
