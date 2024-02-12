import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function DropDown() {
  const [data, setData] = useState({
    countrys: [],
    states: [],
    citys: [],
  });
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  // fetch all countrys
  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get("/dropdown/countrys");
        setData({
          countrys: res.data,
          states: [],
          citys: [],
        });
      })();
    } catch (error) {
      alert("Error in Getting Country : go to console");
      console.clear();
      console.log(error);
    }
  }, []);

  async function countryChanged(event) {
    const value = event.target.value;
    if (value === "")
      return setData((prev) => {
        return { ...prev, states: [], citys: [] };
      });
    try {
      const res = await axios.get("/dropdown/state/" + value);
      setData((prev) => {
        return {
          countrys: prev.countrys,
          states: res.data,
          citys: [],
        };
      });
      stateRef.current.value = "";
      cityRef.current.value = "";
    } catch (error) {
      alert("Error in Getting States : go to console");
      console.clear();
      console.log(error);
    }
  }

  async function stateChanged(event) {
    const value = event.target.value;
    if (value === "")
      return setData((prev) => {
        return { ...prev, citys: [] };
      });
    try {
      const res = await axios.get("/dropdown/city/" + value);
      setData((prev) => {
        return {
          ...prev,
          citys: res.data,
        };
      });
      cityRef.current.value = "";
    } catch (error) {
      alert("Error in Getting Citys : go to console");
      console.clear();
      console.log(error);
    }
  }

  return (
    <main id="main" class="main">
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Select Country : </label>
        <div class="col-sm-10">
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={countryChanged}
          >
            <option value={null} selected>
              Select Country
            </option>
            {data.countrys.map((country) => (
              <option value={country.country_id}>{country.country_name}</option>
            ))}
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Select State : </label>
        <div class="col-sm-10">
          <select
            ref={stateRef}
            class="form-select"
            aria-label="Default select example"
            onChange={stateChanged}
          >
            <option value={""} selected>
              Select State
            </option>
            {data.states.map((state) => (
              <option value={state.state_id}>{state.state_name}</option>
            ))}
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Select City : </label>
        <div class="col-sm-10">
          <select
            ref={cityRef}
            class="form-select"
            aria-label="Default select example"
          >
            <option value={""} selected>
              Select City
            </option>
            {data.citys.map((city) => (
              <option value={city.city_id}>{city.city_name}</option>
            ))}
          </select>
        </div>
      </div>
    </main>
  );
}

export default DropDown;
