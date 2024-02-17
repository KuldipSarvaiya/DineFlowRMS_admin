import React from "react";

function BookingReqs() {
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h6 className="card-title">Table Booking Requests</h6>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">CUSTOMER</th>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
                <th scope="col">PERSONS</th>
                <th scope="col">DURATION</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{1}</td>
                <td>{"John Doe"}</td>
                <td scope="row">
                  <a href="#">{new Date().toLocaleDateString()}</a>
                </td>
                <td>
                  <a href="#">{new Date().toLocaleTimeString()}</a>
                </td>
                <td>{4}</td>
                <td>{45} min.</td>
                <td>
                  <button className="btn btn-warning">
                    <i className="bx bx-time">Pending</i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      alert("order deleted");
                    }}
                  >
                    <i className="bx bx-trash"></i>
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="btn btn-success"
                    onClick={() => console.log(prompt("Enter Table Number : "))}
                  >
                    <i className="bx bx-check"></i>
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

export default BookingReqs;
