import React from "react";
import { useParams } from "react-router-dom";

function BillsForm() {
  const { id } = useParams();
  return (
    <section>
      <div>BillsForm</div>
      <h1>{id}</h1>
    </section>
  );
}

export default BillsForm;
