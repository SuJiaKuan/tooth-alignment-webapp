import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string,
  protein: string,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  ['Extrusion/Intrusion, mm', '0', '0.1 E', '0.2 E', '0.2 E', '0.7 E', '1.6 E', '1.1 E'],
  ['Relative Ext/Int, mm', '0.7 E', '0', '0.2 I', '0.2 I', '0.9 E', '1.9 E', '1.0 E'],
  ['Translation Buccal/Lingual', '0.3 L', '0', '0.1 L', '0.1 B', '0.3 L', '0.5 L', '0.1 L'],
  ['Translation Mesial/Distal', '0.4 D', '0.2 D', '0.2 D', '0', '0.5 D', '0.2 D', '0.1 D'],
  ['Rotation, °', '2.1 D', '0.3 D', '5.7 D', '8.7 D', '1.7 D', '11.6 D', '2.4 D'],
  ['Angulation, °', '5.0 M', '1.9 D', '0.8 D', '2.0 D', '9.9 D', '4.6 D', '7.0 M'],
  ['Inclination, °', '6.9 L', '0.1 B', '6.5 B', '5.8 B', '1.9 L', '6.6 L', '2.8 L'],
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Movement</TableCell>
            <TableCell align="right">1.7</TableCell>
            <TableCell align="right">1.6</TableCell>
            <TableCell align="right">1.5</TableCell>
            <TableCell align="right">1.4</TableCell>
            <TableCell align="right">1.3</TableCell>
            <TableCell align="right">1.2</TableCell>
            <TableCell align="right">1.1</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              <TableCell align="right">{row[2]}</TableCell>
              <TableCell align="right">{row[3]}</TableCell>
              <TableCell align="right">{row[4]}</TableCell>
              <TableCell align="right">{row[5]}</TableCell>
              <TableCell align="right">{row[6]}</TableCell>
              <TableCell align="right">{row[7]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
