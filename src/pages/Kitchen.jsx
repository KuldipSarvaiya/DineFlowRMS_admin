import React, { useContext, useEffect, useState } from "react";
import "../styles/menuitem.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Kitchen() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currTable, setCurrTable] = React.useState(1);
  const [tables, setTables] = React.useState([]);

  useEffect(() => {
    if (tables.length) fetchData();
    else fetchTables();
  }, [tables, currTable]);

  async function fetchData() {
    const res = await axios.get("/trn_order/for_chef/" + currTable);
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  async function changeTrnOrderState(trn_order) {
    const res = await axios.put(
      `/trn_order/${trn_order.trn_order_id}`,
      trn_order
    );
    if (res.data) fetchData();
  }

  async function fetchTables() {
    const res = await axios.get("/table/busy");
    if (res.statusText === "OK") setTables(res.data);
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="card-title" style={{ padding: 10 }}>
            <h3>Pending Current Orders For Menuitem</h3>
            <hr />
            {tables.map((tb, i) => {
              return (
                <span key={i + tb.table_no} style={{ marginRight: 5 }}>
                  <button
                    type="button"
                    class={`btn btn-${
                      currTable !== tb.table_id ? "secondary" : "primary"
                    }`}
                    onClick={() => setCurrTable(tb.table_id)}
                  >
                    <i className="bi bi-table"></i>
                    &nbsp; Table {tb.table_no}
                  </button>
                </span>
              );
            })}
          </div>
          <hr />
          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IMAGE</th>
                <th scope="col">MENU ITEM NAME</th>
                <th scope="col">ORDER STATUS</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={item.trn_order_id}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <img
                        className="menuitem-image"
                        src={`http://localhost:8080/images/${item.image_url}`}
                        alt={"."}
                      />
                    </td>
                    <td>{item.item_name}</td>
                    <td>{item.order_status}</td>
                    <td>{item.qty}</td>
                    <td>
                      {item.order_status === "Pending" ? (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            changeTrnOrderState({
                              ...item,
                              order_status: "Preparing",
                            })
                          }
                        >
                          <i className="ri ri-cup-fill"></i>
                          &nbsp;Start Cooking
                        </button>
                      ) : (
                        // &nbsp;
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            changeTrnOrderState({
                              ...item,
                              order_status: "Ready",
                            })
                          }
                        >
                          <i className="bi bi-patch-check-fill"></i>
                          &nbsp;Item Ready
                        </button>
                      )}
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

export default Kitchen;
