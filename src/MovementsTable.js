import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MovementsTable = ({ movements }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 2500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{movements[0][0]}</TableCell>
            {
              movements[0].slice(1).map((value, index) => (
                <TableCell
                  align="right"
                  key={`${index}_${value}`}
                >
                  {value}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.slice(1).map((movement) => (
            <TableRow
              key={movement[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {movement[0]}
              </TableCell>
              {
                movement.slice(1).map((value, index) => (
                  <TableCell
                    align="right"
                    key={`${index}_${value}`}
                  >
                    {value}
                  </TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovementsTable;
