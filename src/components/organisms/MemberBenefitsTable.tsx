'use client'
import React, { useEffect, useState } from 'react'
import Button from '@/components/atomic/button/Button'
import Dropdown from '@/components/atomic/dropdown/Dropdown'
import Table from '@/components/organisms/table/Table'
import TableBody from '@/components/organisms/table/TableBody'
import TableCell from '@/components/organisms/table/TableCell'
import TableHead from '@/components/organisms/table/TableHead'
import TableRow from '@/components/organisms/table/TableRow'
import DeleteIcon from "@/icons/trash-icon.svg"
import { changeUserRole, deleteUser, searchUsers } from '@/app/actions/users'
import customToast from '../atomic/toast/customToast'
import ConfirmationModal from '../molecules/confirmation-modal/ConfirmationModal'
import Pagination from '../molecules/pagination/Pagination'
import { useReactTable, getCoreRowModel, getPaginationRowModel, PaginationState, flexRender, createColumnHelper } from '@tanstack/react-table';
import Badge from '../atomic/badge/Badge'
import { useSession } from 'next-auth/react'
import AddUserModal from '../molecules/add-user-modal'
import InputField from '../atomic/input/InputField'
import MagnifyingGlass from "@/icons/magnifying-glass.svg"
import useDebounce from '@/hooks/useDebounce'
import { Category, MemberBenefit } from '@prisma/client'
import AddCategoryModal from '../molecules/add-category-modal'
import { createCategory, createMemberBenefit, deleteCategory, deleteMemberBenefit, updateMemberBenefit } from '@/app/actions'
import AddMemberBenefitModal from '../molecules/add-memberbenefit-modal'
import { Row } from '@react-email/components'


interface MemberBenefitsTableProps {
    memberBenefits: MemberBenefit[]
    categories: Category[]
}

const MemberBenefitsTable = ({ memberBenefits: defaultMemberBenefits, categories }: MemberBenefitsTableProps) => {
    const session = useSession()
    const [memberBenefits, setMemberBenefits] = useState<MemberBenefit[]>(defaultMemberBenefits)
    const [modalOpen, setModalOpen] = useState(false)
    const [memberBenefitModal, setMemberBenefitModal] = useState(false)
    const [toBeDeletedMemberBenefitId, setToBeDeletedMemberBenefitId] = useState('')
    const [tobeEditedMemberBenefit, setTobeEditedMemberBenefit] = useState<MemberBenefit | undefined>(undefined)
    const columnHelper = createColumnHelper<MemberBenefit>()
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState(false)
    const debouncedValue = useDebounce(search, 500)


    useEffect(() => {
        // (async () => {
        //     if (!searched) {
        //         if (!debouncedValue && debouncedValue === '') {
        //             setCategories(defaultUsers)
        //             return
        //         }
        //         const filteredUsers = await searchUsers(debouncedValue)
        //         setCategories(filteredUsers)
        //         setSearched(true)
        //     }
        // })()
    }, [debouncedValue])
    const columns = [
        columnHelper.accessor(row => row.title, {
            id: 'Title',
            cell: info => {
                return <a href={""} target='_blank' className='text-blue-500 hover:underline'>{info.getValue()}</a>
            },
            header: () => <span>Title</span>,
            footer: info => info.column.id,
        }),

        columnHelper.accessor(row => row.categoryId, {
            id: 'Category',
            cell: info => {
                const categoryId = info.getValue()
                if (categoryId === null) return 'Uncategorized'
                const category = categories.find(category => category.id === categoryId)
                return category?.name
            },
            header: () => <span>Category</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.description, {
            id: 'Description',
            cell: info => info.getValue(),
            header: () => <span>Description</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.code, {
            id: 'Code',
            cell: info => info.getValue(),
            header: () => <span>Code</span>,
            footer: info => info.column.id,
        }),
        columnHelper.display({
            id: 'Actions',
            cell: info => {
                const memberBenefit = memberBenefits[info.row.index]
                return (<div className='flex justify-start gap-2'>
                    <Button icon={<DeleteIcon />} size='md' onClick={() => {

                        setMemberBenefitModal(true)
                        setTobeEditedMemberBenefit(memberBenefit)
                    }} />
                    <Button icon={<DeleteIcon />} size='md' onClick={() => {
                        setModalOpen(true)
                        setToBeDeletedMemberBenefitId(memberBenefit.id)
                    }} className='!w-fit !p-2 !min-w-fit text-red-600 border-red-300 bg-red-100 hover:bg-red-200 dark:bg-button-background-dark dark:hover:bg-profile-modal-border-dark' variant='alert' label='' />
                </div>)
            },
            header: () => <span>Actions</span>,
        }),
    ]
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    })
    const table = useReactTable({
        columns,
        data: memberBenefits,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        state: {
            pagination

        },
    });





    const handleDelete = async (memberBenefitId: string) => {
        try {

            await deleteMemberBenefit(memberBenefitId)
            setMemberBenefits(memberBenefits.filter(memberBenefit => memberBenefit.id !== memberBenefitId))
            customToast.success('Member Beenfit deleted successfully')
        } catch (error) {
            customToast.error('Failed to delete member benefit')
        }
        finally {
            setToBeDeletedMemberBenefitId('')
        }
    }

    return (
        <div className='h-full min-h-[100vh]'>
            <div className='flex w-full justify-end my-4 '>
                <InputField placeholder='Search' name='search' leadingIcon={<MagnifyingGlass />}
                    id='search' value={search} onChange={(e) => {
                        setSearched(false)
                        setSearch(e.target.value)
                    }} className='border-none outline-none hover:border-none focus:border-none
                             !px-8 !shadow-none !mb-2    ' customLeadingIconClassName='!left-[8px] !top-[14px] ' />
            </div>
            <div className='flex flex-col gap-4'>

                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableCell key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {
                            console.log(row.getVisibleCells())
                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <div className='self-end flex flex-col gap-4'>

                    <Pagination
                        totalPages={Math.ceil(memberBenefits.length / 5)}
                        previousButton
                        nextButton
                        previousButtonDisabled={!table.getCanPreviousPage()}
                        nextButtonDisabled={!table.getCanNextPage()}
                        onPreviousClick={() => { table.previousPage() }}
                        onNextClick={() => { table.nextPage() }}
                        onPageClick={(pageNumber) => {
                            table.setPagination({
                                pageIndex: pageNumber - 1,
                                pageSize: 5
                            })
                        }}
                    />
                    <Button label='Add Member Benefit' className='w-fit self-end' variant='primary' onClick={() => setMemberBenefitModal(true)} />
                </div>
            </div>
            <ConfirmationModal
                icon={
                    <div className='p-2 w-fit bg-gradient-to-b from-red-100 to-red-200  text-red-500
            rounded-[32px] border border-grey-200'>
                        <DeleteIcon />
                    </div>
                }
                isOpen={modalOpen} onClose={() => setModalOpen(false)} title='Delete Member Benefit?' description='This action is irreversible'>
                <>
                    <Button variant='secondary' label='Cancel' onClick={() => setModalOpen(false)} />
                    <Button variant='alert' label='Delete Member Benefit' onClick={() => {
                        handleDelete(toBeDeletedMemberBenefitId)
                        setModalOpen(false)
                    }}
                    />
                </>
            </ConfirmationModal>
            {memberBenefitModal && <AddMemberBenefitModal
                categories={categories}
                editMemberBenefit={tobeEditedMemberBenefit}
                onClose={() => setMemberBenefitModal(false)}
                onUpdate={async (data) => {
                    try {
                        const updatedMemberBenefit = await updateMemberBenefit({
                            id: data.id,
                            categoryId: data.categoryId,
                            code: data.code,
                            domain: data.domain,
                            location: data.location,
                            description: data.description,
                            link: data.link,
                            userId: session.data?.user?.id! as string,
                            title: data.name
                        })
                        setMemberBenefits(memberBenefits.map(memberBenefit => memberBenefit.id === updatedMemberBenefit.id ? updatedMemberBenefit : memberBenefit))
                        setMemberBenefitModal(false)
                        setTobeEditedMemberBenefit(undefined)
                        customToast.success('Member Benefit updated successfully')
                    } catch (error) {
                        customToast.error('Failed to update member benefit')
                    }

                }}
                onCreate={async (data) => {
                    const userId = session.data?.user?.id! as string
                    const newMemberBenefit = await createMemberBenefit({
                        categoryId: null,
                        code: data.code,
                        domain: data.domain,
                        location: data.location,
                        description: data.description,
                        link: data.link,
                        userId: userId,
                        categoryId: data.categoryId,
                        title: data.name
                    })
                    setMemberBenefits([...memberBenefits, newMemberBenefit])
                    setMemberBenefitModal(false)
                }}
            />}
        </div>
    )
}

export default MemberBenefitsTable