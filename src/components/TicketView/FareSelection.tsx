import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface fareSelectionProps {
    totalAmountOfTickets: number;
}

function FareSelection(props: fareSelectionProps) {
    function createData(
        id: number,
        name: string,
        price: number,
        condition: string,
        amountOfTickets: number,
    ) {
        return { id, name, price, condition, amountOfTickets };
    };

    const [totalAmountOfTickets, setTotalAmountOfTickets] = useState(props.totalAmountOfTickets);

    const rows = [
        createData(0, 'Adults', 10.00, "", 0),
        createData(1, 'Kids', 7.00, "Kids under 16 years old", 0),
        createData(2, 'Students', 8.00, "Students with a student ID", 0),
        createData(3, 'Pensioner', 9.00, "People older than 65", 0),
    ];

    const [fares, setFares] = useState(rows);

    useEffect(() => {
        const currentTotalAmountOfTickets = calculateTotalAmountOfTickets();
        if (currentTotalAmountOfTickets !== totalAmountOfTickets) {
            const newFares = fares.map((row, id) => {
                if (id === 0) {
                    return {
                        ...row,
                        amountOfTickets: props.totalAmountOfTickets,
                    }
                }
                return row;
            })
            setFares(newFares);
        }
    }, []);

    const handleRemoveTicket = (index: number) => {
        let isNumberChanged = false;
        if (fares[index].amountOfTickets > 0) {
            const newFares = fares.map((row, id) => {
                if (index === id) {
                    return { ...row, amountOfTickets: --row.amountOfTickets, }
                } else {
                    for (let i = 0; i < fares.length; i++) {
                        if ((id === i) && (!isNumberChanged)) {
                            isNumberChanged = true;
                            return { ...row, amountOfTickets: ++row.amountOfTickets, };
                        }
                    }
                }
                return row;
            });
            setFares(newFares);
        }
    };

    const handleAddTicket = (index: number) => {
        let isNumberChanged = false;
        if (fares[index].amountOfTickets < totalAmountOfTickets) {
            const newFares = fares.map((row, id) => {
                if (index === id) {
                    return { ...row, amountOfTickets: ++row.amountOfTickets, };
                } else {
                    for (let i = 0; i < fares.length; i++) {
                        if ((id === i) && (row.amountOfTickets > 0) && (!isNumberChanged)) {
                            isNumberChanged = true;
                            return { ...row, amountOfTickets: --row.amountOfTickets, };
                        }
                    }
                }
                return row;
            });
            setFares(newFares);
        }
    };

    const calculateTotalAmountOfTickets = () => {
        let totalAmountOfTickets = 0;
        fares.forEach((row) => {
            totalAmountOfTickets += row.amountOfTickets;
        });
        return totalAmountOfTickets;
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }} alignItems='center'>
            <Typography variant="h4" sx={{ p: 3, paddingLeft: '5rem' }}>{totalAmountOfTickets} Tickets</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '19rem' }}>
                <Table>
                    <TableBody>
                        {fares.map((fare, index) => (
                            <TableRow key={index} >
                                <TableCell align='center'>
                                    <Typography>{fare.name}</Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <IconButton onClick={() => handleRemoveTicket(index)} disabled={fare.amountOfTickets === 0}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography>{fare.amountOfTickets}</Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <IconButton onClick={() => handleAddTicket(index)} disabled={fare.amountOfTickets === totalAmountOfTickets}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    );
}

export default FareSelection; 