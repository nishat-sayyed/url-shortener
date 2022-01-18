import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import React, { FC } from 'react';
import { IPageVisitTable } from '../types';

const PageVisitsTable: FC<IPageVisitTable> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>IP Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Visited At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.city + index}>
              <TableCell component="th" scope="row">
                {row.ip_address}
              </TableCell>
              <TableCell>{row.city ? row.city : 'NA'}</TableCell>
              <TableCell>{row.region ? row.region : 'NA'}</TableCell>
              <TableCell>{row.country ? row.country : 'NA'}</TableCell>
              <TableCell>
                {row.visited_at ? new Date(row.visited_at).toISOString() : 'NA'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PageVisitsTable;
