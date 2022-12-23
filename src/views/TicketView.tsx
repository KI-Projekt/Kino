import * as React from "react";
import FareSelection from "../components/TicketView/FareSelection";
import Seatplan from "../components/TicketView/Seatplan";
import "bootstrap/dist/css/bootstrap.min.css";


function TicketView() {
  return (
    <div className="row">

      <Seatplan />
      <FareSelection totalAmountOfTickets={2} />
    </div>
  );
}

export default TicketView;
