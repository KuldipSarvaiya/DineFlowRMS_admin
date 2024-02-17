import React from "react";
import { useParams } from "react-router-dom";

function RestUser() {
  const { role, id } = useParams();
  return (
    <section>
      <div>RestUser</div>
      <h1>{role}</h1>
      <h1>{id}</h1>
    </section>
  );
}

export default RestUser;
