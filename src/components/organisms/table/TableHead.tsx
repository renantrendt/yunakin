import React from 'react'
import TableRow from './TableRow';

interface TableHeadProps {
    children: React.ReactElement<typeof TableRow>[] | React.ReactElement<typeof TableRow>;

}


const TableHead = ({ children }: TableHeadProps) => {
    return (
        <thead className=''>{children}</thead>
    )
}

export default TableHead