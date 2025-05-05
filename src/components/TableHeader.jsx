import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { HEAD_CELLS } from "../constants/HeadCells";

export default function TableHeader({ order, orderBy, onSort }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">Details</TableCell>
        {HEAD_CELLS.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={onSort(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
