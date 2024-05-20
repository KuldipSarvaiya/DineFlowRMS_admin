import axios from "axios";
import React, { useEffect } from "react";

function ItemOrders() {
  const [orders, setOrders] = React.useState([]);
  const [currTable, setCurrTable] = React.useState("");
  const [tables, setTables] = React.useState([]);

  useEffect(() => {
    if (tables.length) fetchOrders();
    if (!tables.length) fetchTables();
  }, [tables]);

  async function fetchTables() {
    const res = await axios.get("/table/busy");
    if (res.statusText === "OK" && res.data !== tables && !tables.length) {
      setTables(res.data);
      setCurrTable(res.data[0].table_no);
    }
  }

  async function fetchOrders() {
    const res = await axios.get(
      "/trn_order/get_trn_order_by_table/" + currTable
    );
    console.log(res);
    if (res.statusText === "OK") setOrders(res.data);
  }

  async function changeTrnOrderState(trn_order) {
    const res = await axios.put(
      `/trn_order/${trn_order.trn_order_id}`,
      trn_order
    );
    if (res.statusText === "OK") fetchOrders();
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            {tables.map((tb, i) => {
              return (
                <span style={{ marginRight: 5 }}>
                  <button
                    key={i}
                    type="button"
                    class={`btn btn-${
                      currTable !== tb.table_no ? "secondary" : "primary"
                    }`}
                    onClick={() => setCurrTable(tb.table_no)}
                  >
                    <i className="bi bi-table"></i>
                    &nbsp; Table {tb.table_no}
                  </button>
                </span>
              );
            })}
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IMAGE</th>
                <th scope="col">MENU ITEM NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.length <= 0 && <p>No Orders Yet</p>}
              {orders.map((item, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <img
                        className="menuitem-image"
                        src={`http://localhost:8080/images/${item.image_url}`}
                        alt={"."}
                      />
                    </td>
                    <td>{item.item_name}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                    <td>{item.order_status}</td>
                    <td>
                      {item.order_status === "Ready" && (
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            changeTrnOrderState({
                              ...item,
                              order_status: "Ready",
                            });
                          }}
                        >
                          <i className="bx bx-wine"></i>
                          &nbsp;Item Served
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

export default ItemOrders;
