import { Box, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface fareSelectionProps {
    totalAmountOfTickets: number;
}
export interface fareSelection {
    id: number,
    name: string,
    price: number,
    condition: string,
    amountOfTickets: number,
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

    const totalAmountOfTickets = props.totalAmountOfTickets;

    const rows = [
        createData(0, 'Adults', 10.00, "People older than 16 and younger than 65 years old", 0),
        createData(1, 'Kids', 7.00, "Kids under 16 years old", 0),
        createData(2, 'Students', 8.00, "Students with a student ID", 0),
        createData(3, 'Pensioner', 9.00, "People older than 65", 0),
    ];

    const [fares, setFares] = useState<Array<fareSelection>>(rows);

    const [anchorElConditionInfo, setAnchorElConditionInfo] = React.useState<HTMLButtonElement | null>(null);

    const [currentFareCondition, setCurrentFareCondition] = React.useState<string>("");

    const handleClickOnInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElConditionInfo(event.currentTarget);
        setCurrentFareCondition(event.currentTarget.id);
    };

    const handleCloseOnInfo = () => {
        setAnchorElConditionInfo(null);
        setCurrentFareCondition("");
    };

    const openConditionInfo = Boolean(anchorElConditionInfo);

    const popOver = (
        <Popover
            id={currentFareCondition}
            open={openConditionInfo}
            anchorEl={anchorElConditionInfo}
            onClose={handleCloseOnInfo}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Typography sx={{ p: 2 }}>{currentFareCondition}</Typography>
        </Popover>
    )

    useEffect(() => {
        //initial calculation of ticket amount and add everything to adult fare
        const calculateTotalAmountOfTickets = () => {
            let totalAmountOfTickets = 0;
            fares.forEach((row) => {
                totalAmountOfTickets += row.amountOfTickets;
            });
            return totalAmountOfTickets;
        };
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
    }, [totalAmountOfTickets, fares, props.totalAmountOfTickets]);

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
                    //remove tickets of first fare
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

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }} alignItems='center'>
            <Typography variant="h4" sx={{ p: 3, paddingLeft: '5rem' }}>{totalAmountOfTickets} Tickets</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '23rem' }}>
                <Table>
                    <TableBody>
                        {fares.map((fare, index) => (
                            <TableRow key={index} >
                                <TableCell align='center' sx={{ alignContent: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography>{fare.name}</Typography>
                                        {fare.condition !== "" &&
                                                <IconButton aria-describedby={fare.condition} id={fare.condition} onClick={handleClickOnInfo}>
                                                    <HelpOutlineIcon color={"info"}/>
                                                </IconButton>
                                        }
                                    </Box>
                                </TableCell>
                                < TableCell align='center' >
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
            </TableContainer >
            {popOver}
        </Box >
    );
}

export default FareSelection; 