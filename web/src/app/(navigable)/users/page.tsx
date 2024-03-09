import Badge from '@/components/atomic/badge/Badge'
import Button from '@/components/atomic/button/Button'
import Chip from '@/components/atomic/chip/Chip'
import Dropdown from '@/components/atomic/dropdown/Dropdown'
import Table from '@/components/atomic/table/Table'
import TableBody from '@/components/atomic/table/TableBody'
import TableCell from '@/components/atomic/table/TableCell'
import TableHead from '@/components/atomic/table/TableHead'
import TableRow from '@/components/atomic/table/TableRow'
import DeleteIcon from "@/icons/trash-icon.svg"
import { prisma } from '@/lib/prisma'

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
const colors = ['primary', 'red', 'green', 'grey', 'orange', 'white']
const UsersPage = async () => {

    const users = await prisma.user.findMany();


    return (
        <div className='h-full min-h-[100vh]'>

            <Table>
                <TableHead>
                    <TableCell cellStyle='grey'>Username</TableCell>
                    <TableCell cellStyle='grey'>Email</TableCell>
                    <TableCell cellStyle='grey'>Role</TableCell>
                    <TableCell cellStyle='grey'>Tag</TableCell>
                    <TableCell cellStyle='grey' align='right'>Actions</TableCell>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Dropdown
                                        // onChange={(value) => console.log(value)}
                                        options={[{
                                            value: 'ADMIN',
                                            label: 'Admin',
                                            selected: user.role == "USER"
                                        },
                                        {
                                            value: 'USER',
                                            label: 'User',
                                            selected: user.role == "USER"
                                        }]}

                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip includeClose={true} color={colors[index] as any} type='outline'>
                                        member
                                    </Chip>
                                </TableCell>
                                <TableCell align='right'>
                                    <div className='flex justify-center gap-2'>
                                        <Button icon={<DeleteIcon />} size='sm' classname='!w-fit !p-2 !min-w-fit bg-red-200 hover:bg-red-300 text-red-600' label='' />
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