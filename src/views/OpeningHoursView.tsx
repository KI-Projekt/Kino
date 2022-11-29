import { TableCell, tableCellClasses, TableRow, Container, Typography, TableContainer, Paper, Table, TableHead, TableBody, styled } from '@mui/material';
import * as React from 'react';
import { redTheme } from '../App';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    weekday: string,
    openingHoursStart: string,
    openingHoursEnd: string,
    ) {
        return { weekday, openingHoursStart, openingHoursEnd};
    }
    const rows = [
        createData('Monday', '17:00', '24:00'),
        createData('Tuesday', '17:00', '24:00'),
        createData('Wednesday', '17:00', '24:00'),
        createData('Thursday', '17:00', '24:00'),
        createData('Friday', '17:00', '24:00'),
        createData('Saturday', '17:00', '24:00'),
        createData('Sunday', '17:00', '24:00'),
        
       
];

class OpeningHoursView extends React.Component {
    render() { 
        return ( 
            <Container maxWidth='xs' >
                <Typography variant='h4' align='left' sx={{paddingBottom:'3rem', paddingTop:'3rem', color: redTheme.palette.primary.contrastText}}>Opening hours</Typography>
                <TableContainer component={Paper} >
                    <Table  aria-label="customized table">
                        <TableHead >
                            <TableRow >
                                <StyledTableCell >Weekday</StyledTableCell>
                                <StyledTableCell align="right">Opening hours</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.weekday}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.weekday}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.openingHoursStart} - {row.openingHoursEnd}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
         );
    }
}
 
export default OpeningHoursView;