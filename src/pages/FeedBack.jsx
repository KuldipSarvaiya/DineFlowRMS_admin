import React, { useEffect, useState } from "react";
import axios from "axios";

function FeedBack() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/feedback");
    if (res.data) setData(res.data);
  }

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
              {data.map((feed, i) => {
                return (
                  <tr>
                    <th scope="row">
                      <a href="#">{i + 1}</a>
                    </th>
                    <td>{feed.name}</td>
                    <td>{feed.order_id}</td>
                    <td>{feed.feedback}</td>
                    <td>
                      <span className="badge bg-success">{feed.rating}</span>
                    </td>
                    <td>{new Date(feed.entry_date).toDateString()}</td>
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

export default FeedBack;
