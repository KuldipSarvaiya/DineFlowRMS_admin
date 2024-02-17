import React from "react";
import { useParams } from "react-router-dom";

function TableForm() {
   const { id } = useParams();
  return (
    <section>
      <div>TableForm</div>
      <h1>{id}</h1>
    </section>
  );
}

export default TableForm;
