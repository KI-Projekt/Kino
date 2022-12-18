import React from "react";
import OrderOverview from "../components/PaymentDetailsView/OrderOverview";

function PaymentDetailsView(){
    function createData(
        name: string,
        price: number,
        condition: string,
    ) {
        return { name, price, condition };
    };
    
    const rows = [
        createData('Adults', 10.00, ""),
        createData('Kids', 7.00, "Kids under 16 years old"),
        createData('Students', 8.00, "Students with a student ID"),
        createData('Pensioner', 9.00, "People older than 65"),
    ];
    
    return(
        <div/>
       // <OrderOverview/>
    );
};

export default PaymentDetailsView;