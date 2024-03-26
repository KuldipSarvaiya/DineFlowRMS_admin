import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../AppState";

function Present() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { appData } = useContext(context);
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

  async function generateBill(id, i) {
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
    if (res.data)
      navigate(
        `/bill/${data[i].order_id}?order_id=${data[i].customer_order_id}&name=${data[i].name}&table_no=${data[i].table_no}&bill_date=${data[i].update_date}`
      );
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
                <th scope="col">TABLE NO.</th>
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
                    <td>{order.table_no}</td>
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
                        <>
                          <button
                            className="btn btn-warning"
                            onClick={() => allowOrders(order.order_id, false)}
                          >
                            <i className="bi bi-x">Deny Orders</i>
                          </button>
                          &nbsp; &nbsp;
                          <button
                            className="btn btn-dark"
                            onClick={() => generateBill(order.order_id, i)}
                          >
                            <i className="bi bi-card-checklist">
                              {" "}
                              Generate Bill
                            </i>
                          </button>
                        </>
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

export default Present;
