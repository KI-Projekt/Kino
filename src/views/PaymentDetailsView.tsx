import React from "react";
import OrderOverview from "../components/PaymentDetailsView/OrderOverview";
import { fareSelection } from "../components/TicketView/FareSelection";

export interface Seat {
    seatID: number,
    seatNumber: number,
}

export interface Row {
    seatRowID: number,
    seatRow: String,
    seats: Array<Seat>,
}

function PaymentDetailsView() {
    function createData(
        orderID: number,
        movieID: number,
        showID: number,
        movie: string,
        picture: string,
        showDate: Date,
        room: string,
        seats: Array<Row>,
        fares: Array<fareSelection>,
        price: number,
    ) {
        return {
            orderID, movieID, showID, movie, picture, showDate, room, seats, fares,
            price
        };
    };

    const orderData =
        createData(
            52374,
            346572,
            32765425,
            "Captain Marvel",
            "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg",
            new Date(2023, 4, 4, 20, 30),
            "Saal A",
            [{ seatRowID: 0, seatRow: "D", seats: [{ seatID: 1, seatNumber: 2 }, { seatID: 2, seatNumber: 3 }] },
            { seatRowID: 1, seatRow: "A", seats: [{ seatID: 6, seatNumber: 6 }, { seatID: 8, seatNumber: 8 }, { seatID: 7, seatNumber: 7 }, { seatID: 9, seatNumber: 9 }] }],
            [{ id: 12435, name: "Adult", price: 10.00, condition: "People older than 16 and younger than 65 years old", amountOfTickets: 2, },
            { id: 1, name: 'Kid', price: 7.00, condition: "Kids under 16 years old", amountOfTickets: 1 },
            { id: 2, name: 'Student', price: 8.00, condition: "Students with a student ID", amountOfTickets: 1 },
            { id: 3, name: 'Pensioner', price: 9.00, condition: "People older than 65", amountOfTickets: 2 }],
            32.5,
        )
        ;

    return (
        <div>
            <OrderOverview
                orderID={orderData.orderID}
                movieID={orderData.movieID}
                showID={orderData.orderID}
                movie={orderData.movie}
                picture={orderData.picture}
                showDate={orderData.showDate}
                room={orderData.room}
                seats={orderData.seats}
                fares={orderData.fares}
                price={orderData.price}
            />
        </div>
    );
};

export default PaymentDetailsView;