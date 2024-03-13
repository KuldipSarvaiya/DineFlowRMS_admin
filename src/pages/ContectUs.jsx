import React, { useEffect, useState } from "react";
import axios from "axios";

function ContectUs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/contact_us");
    if (res.data) setData(res.data);
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            Contact Us <span></span>
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">DATE</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">MOBILE</th>
                <th scope="col">MESSAGE</th>
              </tr>
            </thead>
            <tbody>
              {data.map((feed, i) => {
                return (
                  <tr>
                    <th scope="row">
                      <a href="#">{i + 1}</a>
                    </th>
                    <td>{new Date(feed.entry_date).toDateString()}</td>
                    <td>{feed.name}</td>
                    <td>{feed.email}</td>
                    <td>{feed.contact_number}</td>
                    <td>
                      <>{feed.message}</>
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

export default ContectUs;
