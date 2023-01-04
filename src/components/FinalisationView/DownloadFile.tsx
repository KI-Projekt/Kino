import { Box, Card, useTheme } from "@mui/material";
import OrderOverview from "../PaymentDetailsView/OrderOverview";
import { Order } from "../../views/PaymentDetailsView";
import React from "react";

interface DownloadFileProps {
    order: Order | undefined;
    printRef: React.MutableRefObject<HTMLInputElement>
}

function DownloadFile(props: DownloadFileProps) {

    const theme = useTheme();

    React.useEffect(() => {
    }, [])

    return (
        <>
            <div ref={props.printRef}>
                {props.order &&
                    <Box sx={{ width: "2480px", height: "3508px" }}>
                        <Card sx={{ p: theme.spacing(3) }} elevation={0}>
                            <OrderOverview
                                orderID={props.order.orderID}
                                movieID={props.order.movieID}
                                showID={props.order.orderID}
                                movie={props.order.movie}
                                picture={props.order.picture}
                                showDate={props.order.showDate}
                                room={props.order.room}
                                seats={props.order.seats}
                                fares={props.order.fares}
                                price={props.order.price}
                            />
                        </Card>
                    </Box>
                }
            </div>
        </>
    );
}

export default DownloadFile;