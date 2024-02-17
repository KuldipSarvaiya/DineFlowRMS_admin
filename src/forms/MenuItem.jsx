import React from "react";
import { useParams } from "react-router-dom";

function MenuItem() {
  const { id } = useParams();
  return (
    <section>
      <div>MenuItem</div>
      <h1>{id}</h1>
    </section>
  );
}

export default MenuItem;
