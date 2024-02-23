import React, { useEffect, useState } from "react";
import axios from "axios";

function BookingReqs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/booking/manage/pending");
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  async function actionBooking(id, is_accepted) {
    const this_booking = data.find((item) => item.booking_id === id);
    let table_no = this_booking.table_no;
    if (is_accepted === "Accepted")
      table_no = prompt("Enter Table Number To Allocate To This Booking : ").toString();
    console.log(this_booking, is_accepted);
    const res = await axios.put(`/booking/${id}`, {
      ...this_booking,
      is_accepted,
      table_no,
      updated_by: 1,
      updated_by_role: 1,
    });
    console.log(res.data);
    if (res.data) fetchData();
  }

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
              {data.map((item, i) => {
                return (
                  <tr key={item.name + i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td scope="row">
                      <span>
                        {new Date(item.booking_date).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <span>
                        {new Date(item.booking_time).toLocaleTimeString()}
                      </span>
                    </td>
                    <td>{item.person_count}</td>
                    <td>{item.duration} min.</td>
                    <td>
                      <button className="btn btn-warning">
                        <i className="bx bx-time">{item.is_accepted}</i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          actionBooking(item.booking_id, "Accepted")
                        }
                      >
                        <i className="bx bx-check"></i>
                      </button>
                      &nbsp; &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          actionBooking(item.booking_id, "Rejected");
                        }}
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

export default BookingReqs;
