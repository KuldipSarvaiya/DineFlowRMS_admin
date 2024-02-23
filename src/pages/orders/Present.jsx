import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Present() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/order/today");
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  async function allowOrders(id, allow) {
    const order = data.filter((order) => order.order_id === id);
    console.log(order[0]);
    const res = await axios.put(`/order/${id}`, {
      ...order[0],
      allow_orders: allow,
      updated_by: 1,
      updated_by_role: 1,
    });
    if (res.data) fetchData();
  }

  async function generateBill(id) {
    const order = data.filter((order) => order.id === id);
    const charges = prompt("Enter Charges Applied on this Order");
    const discount = prompt("Enter Discount Applied on this Order");

    // return if values not properly entered
    if (!charges || !discount) return;

    const res = await axios.put(`/order/generate_bill/${id}`, {
      ...order[0],
      charges,
      discount,
      updated_by: 1,
      updated_by_role: 1,
    });
    console.log(res.data);
    if (res.data) navigate("/bill/" + id);
  }

  async function deleteBill(id) {
    const res = await axios.delete(`/order/${id}`);
    if (res.data) fetchData();
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h6 className="card-title">Current Orders</h6>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">CUSTOMER</th>
                <th scope="col">DATE</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{order.customer_order_id}</td>
                    <td>{order.name}</td>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>
                      {order.allow_orders === 0 && (
                        <button
                          className="btn btn-success"
                          onClick={() => allowOrders(order.order_id, true)}
                        >
                          <i className="bx bx-check">Allow Orders</i>
                        </button>
                      )}
                      &nbsp; &nbsp;
                      {order.allow_orders === 1 && (
                        <button
                          className="btn btn-warning"
                          onClick={() => allowOrders(order.order_id, false)}
                        >
                          <i className="bi bi-x">Deny Orders</i>
                        </button>
                      )}
                      &nbsp; &nbsp;
                      {order.allow_orders === 1 ? (
                        order.is_complete ? (
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              navigate(`/bill/${order.order_id}`);
                            }}
                          >
                            <i className="bi bi-arrow-up-right"></i>
                          </button>
                        ) : (
                          <button
                            className="btn btn-dark"
                            onClick={() => generateBill(order.order_id)}
                          >
                            <i className="bi bi-card-checklist">
                              {" "}
                              Generate Bill
                            </i>
                          </button>
                        )
                      ) : (
                        ""
                      )}
                      &nbsp; &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteBill(order.order_id);
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

export default Present;
