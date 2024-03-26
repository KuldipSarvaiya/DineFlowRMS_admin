import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MenuItem() {
  const { id } = useParams();
  const [data, setData] = useState({
    item_name: "",
    price: "",
    img: "",
    category: "",
  });
  const navigate = useNavigate();
  async function fetchData() {
    const res = await axios.get(`/menuitem/${id}`);
    console.log(res.data);
    if (res.data) setData(res.data[0]);
  }
  useEffect(() => {
    if (id) fetchData();
  }, []);
  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    if (name === "img") value = event.target.files[0];
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let res = null;
    console.clear();
    console.log(data);
    if (id)
      res = await axios.put(
        `/menuitem/${!data?.img ? "noimage/" : ""}${id}`,
        {
          ...data,
          updated_by: 1,
          updated_by_role: 1,
        },
        {
          headers: {
            "Content-Type": data?.img
              ? "multipart/form-data"
              : "application/json",
          },
        }
      );
    else
      res = await axios.post(
        `/menuitem`,
        {
          ...data,
          entry_by: 1,
          entry_by_role: 1,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

    if (res.data) navigate("/menu", { replace: true });
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h1>Manage MenuItem</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div class="row mb-3">
              <label htmlFor="inputText" class="col-sm-2 col-form-label">
                Name
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.item_name}
                  onChange={handleChange}
                  type="text"
                  required
                  name="item_name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputNumber" class="col-sm-2 col-form-label">
                Price
              </label>
              <div class="col-sm-10">
                <input
                  value={data?.price}
                  onChange={handleChange}
                  type="number"
                  required
                  name="price"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputNumber" class="col-sm-2 col-form-label">
                File Upload
              </label>
              <div class="col-sm-10">
                <input
                  // defaultValue={data?.image_url}
                  onChange={handleChange}
                  class="form-control"
                  type="file"
                  name="img"
                  id="formFile"
                  required={!id}
                />
              </div>
            </div>

            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Category</label>
              <div class="col-sm-10">
                <select
                  onChange={handleChange}
                  value={data?.category}
                  class="form-select"
                  aria-label="Default select example"
                  required
                  name="category"
                >
                  <option selected="">category menu</option>
                  <option value="Starter">Starter</option>
                  <option value="South-Indian">South-Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Sabzi">Sabzi</option>
                  <option value="Chapati">Chapati</option>
                  <option value="Rise-Dal">Rise-Dal</option>
                  <option value="Fast-Foods">Fast-Foods</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
            </div>

            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Submit Form</label>
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
