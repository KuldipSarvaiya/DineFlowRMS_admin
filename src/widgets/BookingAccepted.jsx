import React, { useEffect, useState } from "react";
import axios from "axios";

function BookingAccepted() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/booking/manage/upcoming");
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  async function deleteBooking(id) {
    const res = await axios.delete(`/booking/${id}`);
    if (res.data) fetchData();
  }

  function SubNavBar() {
    async function handleSearch(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      const date_from = data.get("from_date");
      const date_to = data.get("to_date");
      const res = await axios.get(
        `/booking/manage/upcoming?date_from=${date_from}&date_to=${date_to}`
      );
      console.log(res.data);
      if (res.data) setData(res.data);
    }
    return (
      <>
        <form onSubmit={handleSearch}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              alignItems: "center",
              margin: 10,
              paddingBottom: 10,
              borderBottom: "2px solid gray",
            }}
          >
            <h5>Search Between : </h5>
            <div className="">
              <div className="col-sm-11" style={{ padding: 0 }}>
                <input
                  type="date"
                  className="form-control"
                  name="from_date"
                  style={{ cursor: "pointer" }}
                  required
                />
              </div>
            </div>
            <h6>To</h6>
            <div className="">
              <div className="col-sm-11" style={{ padding: 0 }}>
                <input
                  type="date"
                  className="form-control"
                  name="to_date"
                  style={{ cursor: "pointer" }}
                  required
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-search"></i>
                &nbsp;Search
              </button>
            </div>
          </div>
        </form>
        <div>
          <button className="btn btn-primary" onClick={fetchData}>
            <i className="bi bi-asterisk"></i>
            &nbsp;Get All
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <SubNavBar />
          <h6 className="card-title">Upcoming Table Bookings</h6>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">CUSTOMER</th>
                <th scope="col">TABLE NO.</th>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
                <th scope="col">PERSONS</th>
                <th scope="col">DURATION</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={item.name + i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.table_no}</td>
                    <td scope="row">
                      <span>
                        {new Date(item.booking_date).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <span>{item.booking_time}</span>
                    </td>
                    <td>{item.person_count}</td>
                    <td>{item.duration} min.</td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteBooking(item.booking_id);
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

export default BookingAccepted;
