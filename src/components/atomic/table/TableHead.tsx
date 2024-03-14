import React from 'react'
import TableCell from './TableCell';

interface TableHeadProps {
    children: React.ReactElement<typeof TableCell>[];

}


const TableHead = ({ children }: TableHeadProps) => {
    return (
        <thead>{children}</thead>
    )
}

export default TableHead