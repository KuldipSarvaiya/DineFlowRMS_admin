import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Past() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(query = "") {
    const res = await axios.get("/order?is_complete=0" + query);
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  // async function deleteBill(id) {
  //   const res = await axios.delete(`/order/${id}`);
  //   if (res.data) fetchData();
  // }

  function SubNavBar() {
    function handleSearch(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      const df = new Date(data.get("from_date"));
      const dt = new Date(data.get("to_date"));
      const date_from = `${df.getDate()}/${
        df.getMonth() + 1
      }/${df.getFullYear()}`;
      const date_to = `${dt.getDate()}/${
        dt.getMonth() + 1
      }/${dt.getFullYear()}`;
      console.log(date_from, date_to);
      fetchData("&date_from=" + date_from + "&date_to=" + date_to);
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
            <div class="">
              <div class="col-sm-11" style={{ padding: 0 }}>
                <input
                  type="date"
                  class="form-control"
                  name="from_date"
                  style={{ cursor: "pointer" }}
                  required
                />
              </div>
            </div>
            <h6>To</h6>
            <div class="">
              <div class="col-sm-11" style={{ padding: 0 }}>
                <input
                  type="date"
                  class="form-control"
                  name="to_date"
                  style={{ cursor: "pointer" }}
                  required
                />
              </div>
            </div>
            <div>
              <button type="submit" class="btn btn-primary">
                <i className="bi bi-search"></i>
                &nbsp;Search
              </button>
            </div>
          </div>
        </form>
        <div>
          <button class="btn btn-primary" onClick={fetchData}>
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
          <h6 className="card-title">Order Bills</h6>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">CUSTOMER</th>
                <th scope="col">TABLE NO.</th>
                <th scope="col">BILL DATE</th>
                <th scope="col">BILL AMOUNT</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((bill, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{bill.customer_order_id}</td>
                    <td>{bill.name}</td>
                    <td>{bill.table_no}</td>
                    <td>
                      {new Date(
                        bill.update_date || bill.entry_date
                      ).toLocaleDateString()}
                    </td>
                    <td>{bill.net_total}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          navigate(
                            `/bill/${bill.order_id}?order_id=${bill.customer_order_id}&name=${bill.name}&table_no=${bill.table_no}&bill_date=${bill.update_date}`
                          );
                        }}
                      >
                        <i className="bi bi-arrow-up-right"></i>
                      </button>
                      &nbsp; &nbsp;
                      {/* <button
                        className="btn btn-danger"
                        onClick={() => deleteBill(bill.order_id)}
                      >
                        <i className="bx bx-trash"></i>
                      </button> */}
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

export default Past;
