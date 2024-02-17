import React from "react";

function BookingAccepted() {

  function SearchBar() {
    function handleSearch(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      const from_date = data.get("from_date");
      const to_date = data.get("to_date");
      console.log(from_date, to_date);
    }
    return (
      <form onSubmit={handleSearch}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            margin: 10,
            paddingBottom: 10,
            borderBottom: "2px solid gray",
          }}
        >
          <h5>Search For : </h5>
          <div class="">
            <div class="col-sm-11" style={{ padding: 0 }}>
              <input
                type="date"
                class="form-control"
                name="from_date"
                style={{ cursor: "pointer" }}
                required
              />
            </div>
          </div>
          <h6>To</h6>
          <div class="">
            <div class="col-sm-11" style={{ padding: 0 }}>
              <input
                type="date"
                class="form-control"
                name="to_date"
                style={{ cursor: "pointer" }}
                required
              />
            </div>
          </div>
          <div>
            <button type="submit" class="btn btn-primary">
              <i className="bi bi-search"></i>
              &nbsp;Search
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <SearchBar />
          <h6 className="card-title">Upcoming Table Bookings</h6>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">CUSTOMER</th>
                <th scope="col">TABLE NO.</th>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
                <th scope="col">PERSONS</th>
                <th scope="col">DURATION</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{1}</td>
                <td>{"John Doe"}</td>
                <td>{101}</td>
                <td scope="row">
                  <a href="#">{new Date().toLocaleDateString()}</a>
                </td>
                <td>
                  <a href="#">{new Date().toLocaleTimeString()}</a>
                </td>
                <td>{4}</td>
                <td>{45} min.</td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      alert("order deleted");
                    }}
                  >
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

export default BookingAccepted;
