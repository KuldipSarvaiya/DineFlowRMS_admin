import React, { useEffect, useState } from "react";
import "../styles/menuitem.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Menu() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/menuitem");
    if (res.data) setData(res.data);
  }

  async function deleteMenuItem(id) {
    const res = await axios.delete(`/menuitem/${id}`);
    if (res.data) fetchData();
  }
  
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            Menu Items &nbsp;
            <span>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => navigate("/menuitem")}
              >
                <i className="bi bi-plus"></i> Add New Item
              </button>
            </span>
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IMAGE</th>
                <th scope="col">MENU ITEM NAME</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">PRICE</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
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
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          navigate(`/menuitem/${item.menuitem_id}`)
                        }
                      >
                        <i className="bx bx-edit-alt"></i>
                      </button>
                      &nbsp; &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteMenuItem(item.menuitem_id)}
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

export default Menu;
