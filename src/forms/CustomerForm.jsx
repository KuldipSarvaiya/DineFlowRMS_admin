import React from "react";
import { useParams } from "react-router-dom";

function CustomerForm() {
  const { id } = useParams();
  return (
    <section>
      <div>CustomerForm</div>
      <h1>{id}</h1>
    </section>
  );
}

export default CustomerForm;
