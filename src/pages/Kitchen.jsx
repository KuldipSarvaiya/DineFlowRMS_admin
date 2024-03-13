import React, { useEffect, useState } from "react";
import "../styles/menuitem.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Kitchen() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/trn_order/for_chef");
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

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="card-title" style={{ padding: 10 }}>
            <h3>Pending Current Orders For Menuitem</h3>
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
                      <button
                        className="btn btn-success"
                        onClick={() => changeTrnOrderState({...item, order_status:"Ready"})}
                      >
                        <i className="bi bi-patch-check-fill"></i>
                        &nbsp;Item Ready
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

export default Kitchen;
