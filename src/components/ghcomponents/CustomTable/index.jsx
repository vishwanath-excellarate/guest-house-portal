import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const CustomTable = ({
  columns,
  rows,
  page,
  rowsPerPage,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  renderActionButton,
}) => {
  const dataArray = pagination
    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : rows;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id || column.label}
                  align={column.align || "inherit"}
                  style={{
                    minWidth: column.minWidth || 170,
                    backgroundColor: "#003d3f",
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataArray.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ fontSize: 16, textTransform: "capitalize" }}
                      >
                        {typeof value === "undefined"
                          ? renderActionButton(row)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </Paper>
  );
};

export default CustomTable;

CustomTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  pagination: PropTypes.bool,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  renderActionButton: PropTypes.func,
};

CustomTable.defaultProps = {
  columns: [],
  rows: [],
  page: 0,
  rowsPerPage: 10,
  pagination: true,
  onPageChange: "",
  onRowsPerPageChange: "",
  renderActionButton: "",
};
