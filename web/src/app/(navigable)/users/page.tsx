import Table from '@/components/atomic/table/Table'
import TableBody from '@/components/atomic/table/TableBody'
import TableCell from '@/components/atomic/table/TableCell'
import TableHead from '@/components/atomic/table/TableHead'
import TableRow from '@/components/atomic/table/TableRow'
import React from 'react'

const data = [
    {
        username: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
    },
    {
        username: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
    },
    {
        username: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
    },
    {
        username: 'John Doe',
        email: 'johndoe@gmail.com',
        role: 'admin',
    },
]
const UsersPage = () => {
    return (
        <div className='h-full min-h-[100vh]'>

            <Table>
                <TableHead>
                    <TableCell cellStyle='grey'>Username</TableCell>
                    <TableCell cellStyle='grey'>Email</TableCell>
                    <TableCell cellStyle='grey'>Role</TableCell>
                    <TableCell cellStyle='grey' align='right'>Actions</TableCell>
                </TableHead>
                <TableBody>
                    {data.map((user, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align='right'>
                                    <div className='flex justify-center gap-2'>
                                        <button className='text-blue-500'>Edit</button>
                                        <button className='text-red-500'>Delete</button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>

    )
}

export default UsersPage