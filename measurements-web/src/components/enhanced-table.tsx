import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { Page, Sort } from '../domain/pagination';
import TableRowsLoader from './table-loader';

function EnhancedTableHead(props: {
    columns: EnhancedTableColumn[];
    sort: Sort;
    onSortChange: (event: React.MouseEvent<unknown>, property: string) => void
}) {
    const { columns, sort, onSortChange } = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        onSortChange(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align ? headCell.align : 'left'}
                        sortDirection={sort.field === headCell.id ? sort.direction : false}
                    >
                        {headCell.sortable ?
                            <TableSortLabel
                                active={sort.field === headCell.id}
                                direction={sort.field === headCell.id ? sort.direction : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.title}
                                {sort.field === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {sort.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                            :
                            <>{headCell.title}</>
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export interface EnhancedTableColumn {
    id: string;
    title: string;
    sortable?: boolean;
    align?: "right" | "left" | "center" | "inherit" | "justify";
}

export interface EnhancedTableProps {
    columns: EnhancedTableColumn[];
    data: { [key: string]: React.ReactNode }[];
    total: number;
    loading: boolean;

    sort: Sort;
    onSortChange?: (sort: Sort) => void;
    page: Page;
    onPageChange?: (page: Page) => void;
}

export default function EnhancedTable(props: EnhancedTableProps) {
    const { columns, data, total, loading, sort, onSortChange, page, onPageChange } = props;
    const rows = data ? data.length : 0;

    const handleSortChange = (_event: unknown, property: string) => {
        const isAsc = sort && sort.field === property && sort.direction === 'asc';
        if (onSortChange) {
            onSortChange({ field: property, direction: isAsc ? 'desc' : 'asc' });
        }
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        onPageChange && onPageChange({ index: newPage, size: page.size });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        onPageChange && onPageChange({ index: 0, size: parseInt(event.target.value, 10) });
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page.index > 0 ? Math.max(0, page.size - rows) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer>
                    <Table sx={{ minWidth: 750 }}>

                        <EnhancedTableHead columns={columns} sort={sort} onSortChange={handleSortChange} />

                        {loading &&
                            <TableRowsLoader rows={page.size} columns={columns.length} />
                        }

                        {!loading &&
                            <TableBody>
                                {data.map((row, rowIndex) =>
                                    <TableRow key={`row_${rowIndex}`}>
                                        {columns.map((column, columnIndex) =>
                                            <TableCell
                                                key={`row_${rowIndex}_column_${columnIndex}`}
                                                align={column.align || 'left'}
                                            >
                                                {row[column.id]}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={columns.length} />
                                    </TableRow>
                                )}
                            </TableBody>
                        }
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={page.size}
                    page={page.index}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>
        </Box>
    );
}