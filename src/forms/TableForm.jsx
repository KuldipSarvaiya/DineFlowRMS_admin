import React from "react";
import { useParams } from "react-router-dom";

function TableForm() {
  const { id } = useParams();
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <h1>Manage Table</h1>
          <form>
            <div class="row mb-3">
              <label htmlFor="inputText" class="col-sm-2 col-form-label">
                Table Number
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="text"
                  name="table_no"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="inputNumber" class="col-sm-2 col-form-label">
                Table Capacity
              </label>
              <div class="col-sm-10">
                <input
                  required
                  type="number"
                  name="table_capacity"
                  class="form-control"
                />
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

export default TableForm;
