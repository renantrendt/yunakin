'use client'
import React, { useState } from 'react'
import Button from '@/components/atomic/button/Button'
import Chip from '@/components/atomic/chip/Chip'
import Dropdown from '@/components/atomic/dropdown/Dropdown'
import Table from '@/components/atomic/table/Table'
import TableBody from '@/components/atomic/table/TableBody'
import TableCell from '@/components/atomic/table/TableCell'
import TableHead from '@/components/atomic/table/TableHead'
import TableRow from '@/components/atomic/table/TableRow'
import DeleteIcon from "@/icons/trash-icon.svg"
import { changeUserRole, deleteUser } from '@/app/actions/users'
import customToast from '../atomic/toast/customToast'
import ConfirmationModal from '../molecules/confirmation-modal/ConfirmationModal'
const colors = ['primary', 'red', 'green', 'grey', 'orange', 'white']

interface UsersTableProps {
    users: {
        id: string;
        email: string;
        name: string;
        password: string | null;
        verifyToken: string;
        verified: boolean;
        createdAt: Date;
        updatedAt: Date;
        avatar: string | null;
        role: string;
        provider: string;
    }[]
}
const UsersTable = ({ users: defaultUsers }: UsersTableProps) => {
    const [users, setUsers] = useState(defaultUsers)

    const [modalOpen, setModalOpen] = useState(false)
    const [tobeDeletedUserId, setTobeDeletedUserId] = useState('')

    const handleRoleChange = async (userId: string, role: string) => {
        try {
            console.log(role)
            await changeUserRole(userId, role)
            setUsers(users.map(user => {
                if (user.id === userId) {
                    return {
                        ...user,
                        role
                    }
                }
                return user
            }))
            customToast.success('Role updated successfully')
        } catch (error) {
            customToast.error('Failed to update role')
        }


    }

    const handleDelete = async (userId: string) => {
        try {
            console.log(userId)
            await deleteUser(userId)
            setUsers(users.filter(user => user.id !== userId))
            customToast.success('User deleted successfully')
        } catch (error) {
            customToast.error('Failed to delete user')
        }
        finally {
            setTobeDeletedUserId('')
        }
    }

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
                        console.log(user)
                        return (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {user.role}
                                </TableCell>
                                <TableCell>
                                    <Chip includeClose={true} color={colors[index] as any} type='outline'>
                                        member
                                    </Chip>
                                </TableCell>
                                <TableCell align='right'>
                                    <div className='flex justify-center gap-2'>
                                        <Dropdown
                                            // onChange={(value) => console.log(value)}
                                            options={[{
                                                value: 'ADMIN',
                                                label: 'Admin',
                                                selected: user.role === "ADMIN"
                                            },
                                            {
                                                value: 'USER',
                                                label: 'User',
                                                selected: user.role === "USER"
                                            }]}
                                            onChange={(value: string) => handleRoleChange(user.id, value)}
                                        />
                                        <Button icon={<DeleteIcon />} size='md' onClick={() => {
                                            setTobeDeletedUserId(user.id)
                                            setModalOpen(true)
                                        }} classname='!w-fit !p-2 !min-w-fit text-red-600 border-red-300 bg-red-100 hover:bg-red-200' variant='alert' label='' />
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <ConfirmationModal
                icon={
                    <div className='p-2 w-fit bg-gradient-to-b from-red-100 to-red-200  text-red-500
            rounded-[32px] border-[1px] border-grey-200'>
                        <DeleteIcon />
                    </div>
                }
                isOpen={modalOpen} onClose={() => setModalOpen(false)} title='Delete user?' description='This action is irreversible'>
                <>
                    <Button variant='secondary' label='Cancel' onClick={() => setModalOpen(false)} />
                    <Button variant='alert' label='Delete User' onClick={() => {
                        handleDelete(tobeDeletedUserId)
                        setModalOpen(false)
                    }}
                    />
                </>
            </ConfirmationModal>
        </div>
    )
}

export default UsersTable