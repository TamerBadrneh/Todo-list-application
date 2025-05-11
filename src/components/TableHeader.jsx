import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

// TODO: is Cleaned => True

export default function TableHeader({ order, orderBy, onSort }) {
  // headers...
  const HEAD_CELLS = [
    {
      id: "id",
      label: "Task Number",
    },
    {
      id: "name",
      label: "Task Name",
    },
    {
      id: "isCompleted",
      label: "Completed",
    },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">Details</TableCell>
        {HEAD_CELLS.map((headCell, index) => (
          <TableCell
            key={index}
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
