import React, { useEffect, useState } from "react";
import "../styles/menuitem.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

function GenretedBill() {
  const navigate = useNavigate();
  const { id } = useParams();
  // order_id, name, table_no, bill_date
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  // queary string
  const queryParams = Object.fromEntries(searchParams);
  console.log(queryParams);

  async function fetchData() {
    const res = await axios.get("/order/get_bill/" + id);
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">Ordered Menu Items &nbsp;</h5>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              justifyContent: "space-evenly",
            }}
          >
            <span>
              <b>ORDER ID : </b>
              {queryParams?.order_id}
            </span>
            <span>
              <b>CUSTOMER NAME : </b>
              {queryParams?.name}
            </span>
            <span>
              <b>TABLE NO. :</b> {queryParams?.table_no}
            </span>
            <span>
              <b>BILL DATE :</b>{" "}
              {new Date(queryParams?.bill_date).toLocaleDateString()}
            </span>
          </div>
          <hr />

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IMAGE</th>
                <th scope="col">MENU ITEM NAME</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">PRICE</th>
                <th scope="col">QUENTITY</th>
              </tr>
            </thead>
            <tbody>
              {data?.trn_orders?.map((item, i) => {
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
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={6}>
                  <hr width={"100%"} />
                </td>
              </tr>
              <tr>
                <th scope="col"></th>
                <th scope="col">TOTAL &rarr;</th>
                <th scope="col">SUB TOTAL : {data?.order?.[0]?.sub_total}</th>
                <th scope="col">SERVICE CHARGES : {data?.order?.[0]?.charges}</th>
                <th scope="col">DISCOUNT : {data?.order?.[0]?.discount}</th>
                <th scope="col">NET TOTAL : {data?.order?.[0]?.net_total}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GenretedBill;
