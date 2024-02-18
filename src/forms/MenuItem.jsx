import React from "react";
import { useParams } from "react-router-dom";

function MenuItem() {
  const { id } = useParams();
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h1>Manage MenuItem</h1>
          <form encType="multipart/form-data">
            <div class="row mb-3">
              <label htmlFor="inputText" class="col-sm-2 col-form-label">
                Name
              </label>
              <div class="col-sm-10">
                <input
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
                  class="form-control"
                  type="file"
                  name="img"
                  id="formFile"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <label class="col-sm-2 col-form-label">Category</label>
              <div class="col-sm-10">
                <select
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
