import React from "react";
import "../styles/menuitem.css";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
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
                <th scope="col">PRICE</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>
                  <img
                    className="menuitem-image"
                    src={"/sample.png"}
                    alt={"."}
                  />
                </td>
                <td>Kaccha Karela</td>
                <td>1283 $</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/menuitem/${123}`)}
                  >
                    <i className="bx bx-edit-alt"></i>
                  </button>
                  &nbsp; &nbsp;
                  <button className="btn btn-danger">
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Menu;
