import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

interface TableRowsLoaderProps {
    rows: number;
    columns: number;
}
const TableRowsLoader = (props: TableRowsLoaderProps) => {
    const { rows, columns } = props;

    return <TableBody>
        {[...Array(rows)].map((_row, index) => (
            <TableRow key={index}>
                {[...Array(columns)].map((_col, index) => (
                    <TableCell key={`skeleton_column_${index}`}>
                        <Skeleton animation="wave" variant="text" />
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableBody>

        ;
};

export default TableRowsLoader