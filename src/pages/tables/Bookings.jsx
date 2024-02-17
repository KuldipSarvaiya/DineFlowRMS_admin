import React from "react";
import { useNavigate } from "react-router-dom";
import BookingReqs from "../../widgets/BookingReqs";
import BookingAccepted from "../../widgets/BookingAccepted";

function Bookings() {
  return (
    <>
      <BookingReqs />
      <BookingAccepted />
    </>
  );
}

export default Bookings;
