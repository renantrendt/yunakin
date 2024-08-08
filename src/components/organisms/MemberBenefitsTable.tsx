'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Button from '@/components/atomic/button/Button'
import Table from '@/components/organisms/table/Table'
import TableBody from '@/components/organisms/table/TableBody'
import TableCell from '@/components/organisms/table/TableCell'
import TableHead from '@/components/organisms/table/TableHead'
import TableRow from '@/components/organisms/table/TableRow'
import DeleteIcon from "@/icons/trash-icon.svg"
import customToast from '../atomic/toast/customToast'
import ConfirmationModal from '../molecules/confirmation-modal/ConfirmationModal'
import { useReactTable, getCoreRowModel, PaginationState, flexRender, createColumnHelper } from '@tanstack/react-table';
import { useSession } from 'next-auth/react'
import useDebounce from '@/hooks/useDebounce'
import { Category, MemberBenefit, MemberBenefitPageConfig } from '@prisma/client'
import { createMemberBenefit, deleteMemberBenefit, deleteOtherMemberBenefit, importBenefit, searchBenefitsSemantically, updateMemberBenefit } from '@/app/actions'
import AddMemberBenefitModal from '../molecules/add-memberbenefit-modal'

import { useSearchParams } from 'next/navigation'
import { Filter, MemberBenefitWithImport, PartnershipType } from '@/lib/types'
import _ from 'lodash'
import Image from 'next/image'
import Toggle from '../atomic/toggle/Toggle'
import { PlusIcon, EyeOpenIcon, Pencil1Icon, InfoCircledIcon } from '@radix-ui/react-icons'
import TableHeadCell from './table/TableHeadCell'
import TableFilter from '../filter/TableFilter'
import ViewBenefitDetailsModal from '../molecules/view-benefit-details/ViewBenefitDetailsModal'
import { useMutation } from '@tanstack/react-query'
import LoadingIcon from '@/icons/LoadingIcon'
import { cn } from '@/utils/cn'
import Tooltip from '../atomic/tooltip/Tooltip'
import Typography from '../atomic/typography/Typography'
import { uploadImage } from '@/lib/utils'
import InputField from '../atomic/input/InputField'
import MagnifyingGlass from '@/icons/magnifying-glass.svg'
interface MemberBenefitsTableProps {
    memberBenefits: MemberBenefitWithImport[]
    categories: Category[]
    config: MemberBenefitPageConfig
}

const MemberBenefitsTable = ({ memberBenefits: defaultMemberBenefits, categories, config }: MemberBenefitsTableProps) => {
    const searchParams = useSearchParams()
    const session = useSession()
    const [loading, setLoading] = useState(false)
    const [memberBenefits, setMemberBenefits] = useState<MemberBenefitWithImport[]>(defaultMemberBenefits)
    const [modalOpen, setModalOpen] = useState(false)
    const [memberBenefitModal, setMemberBenefitModal] = useState(searchParams.get('openModal') === 'true' ? true : false)
    const [showBenefitDetailsModal, setShowBenefitDetailsModal] = useState<string | undefined>(undefined)
    const [toBeDeletedMemberBenefitId, setToBeDeletedMemberBenefitId] = useState<string>('')
    const [tobeEditedMemberBenefit, setTobeEditedMemberBenefit] = useState<MemberBenefit | undefined>(undefined)

    const columnHelper = createColumnHelper<MemberBenefit>()
    const [filter, setFilter] = useState<Filter>({
        category: categories.map(category => ({ label: category.name, selected: false })),
        imported: [{ label: 'Imported', selected: false, }, { label: 'Not Imported', selected: false, }],
        partnership_types: _.keys(PartnershipType).map(key => ({ label: key, selected: false })),
    })
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState(false)
    const debouncedValue = useDebounce(search)
    const [searchLoading, setSearchLoading] = useState(false)

    useEffect(() => {
        (async () => {
            if (!debouncedValue) {
                setMemberBenefits(defaultMemberBenefits)
            }
        })()
    }, [debouncedValue])
    const handleSearch = useCallback(async () => {

        setSearchLoading(true)
        const filteredBenefitIds = await searchBenefitsSemantically(debouncedValue)
        if (filteredBenefitIds.length > 0) {
            console.log(defaultMemberBenefits)
            setMemberBenefits(defaultMemberBenefits.filter(f => filteredBenefitIds.includes(f.id)))
        } else {
            setMemberBenefits([])
        }
        setSearched(true)
        setSearchLoading(false)
    }, [setSearchLoading, searched, search])
    const onFilterChange = (filter: Filter) => {
        let filteredBenefits = defaultMemberBenefits
        if (filter.category) {
            const selectedCategories = filter.category.filter(c => c.selected).map(c => c.label)
            if (selectedCategories.length > 0) {
                const categoryIds = categories.filter(category => selectedCategories.includes(category.name)).map(category => category.id)
                filteredBenefits = defaultMemberBenefits.filter(b => b.categoryId && categoryIds.includes(b.categoryId))
            }
        }
        if (filter.imported) {
            const selectedImportFilter = filter.imported.filter(c => c.selected).map(c => c.label)
            if (selectedImportFilter.length > 0) {
                filteredBenefits = filteredBenefits.filter(b => !b.import && selectedImportFilter.some(f => f === 'Not Imported') || b.import && selectedImportFilter.some(f => f === 'Imported'))
            }
        }
        setMemberBenefits(filteredBenefits)
    }

    const isBenefitCreator = (memberBenefitId: string) => {
        const memberBenefit = memberBenefits.find(memberBenefit => memberBenefit.id === memberBenefitId)
        return memberBenefit?.userId === session.data?.user?.id
    }

    const importMutation = useMutation({
        mutationFn: async (data: any) => {
            return await importBenefit(data.benefit.id, data.importStatus)
        },
        onSuccess(data, variables, context) {
            setMemberBenefits(memberBenefits.map(b => b.id === variables.benefit.id ? { ...variables.benefit, import: variables.importStatus } : b))
            if (variables.importStatus) {
                customToast.success('Deal imported successfully')
            } else {
                customToast.success('Deal removed successfully')
            }
        },
        onError: () => {
            customToast.error('Failed to update import status')
        }
    })

    const columns = [
        columnHelper.accessor(row => row.title, {
            id: 'Image',
            cell: info => {
                const memberBenefit = memberBenefits[info.row.index]
                const image = memberBenefit.imageURL && `${memberBenefit.imageURL}` || `/images/dummy_logo.svg`
                return (
                    <Image className=' min-w-12 min-h-12 w-12 h-12 flex-shrink-0 rounded-[14px] border border-[#EBEBEB] duration-300 ease-in-out' src={image} alt="Benefit" width={520} height={360} objectFit='cover' />
                )
            },
            header: () => <span>Image</span>,
            footer: info => info.column.id,
            size: 50,
            maxSize: 50
        }),
        // columnHelper.accessor(row => row.title, {
        //     id: 'Company Name',
        //     cell: info => {
        //         const memberBenefit = memberBenefits[info.row.index]
        //         const domain = memberBenefit.domain.includes('http') ? memberBenefit.domain : `https://${memberBenefit.domain}`
        //         return <a href={domain} target='_blank' className='text-blue-500 hover:underline'>{info.getValue()}</a>
        //     },
        //     header: () => <span>Title</span>,
        //     footer: info => info.column.id,
        // }),

        // columnHelper.accessor(row => row.categoryId, {

        //     id: 'Category',
        //     cell: info => {
        //         const categoryId = info.getValue()
        //         if (categoryId === null) return 'Uncategorized'
        //         const category = categories.find(category => category.id === categoryId)
        //         return category?.name
        //     },
        //     header: () => <span>Category</span>,
        //     footer: info => info.column.id,
        // }),
        columnHelper.accessor(row => row.description, {
            id: 'Description',
            cell: info =>
                info.getValue(),
            header: () => <span>Description</span>,
            footer: info => info.column.id,
            size: 300,
            minSize: 300
        }),
        columnHelper.accessor(row => row.description, {
            id: 'Featured',
            cell: info =>
                <Toggle
                    checked={false}
                    onChange={() => { }}

                />,
            header: () => <div className='flex gap-1 items-center'>
                <span>Featured</span>
                <Tooltip content={"Feature under development."} trigger={<InfoCircledIcon />} />
            </div>,
            footer: info => info.column.id,
            size: 300,
            minSize: 300
        }),
        // columnHelper.accessor(row => row.description, {
        //     id: 'SuggestedDeal',
        //     cell: info =>
        //         <div className='flex gap-2 items-center'>
        //             <div className='text-[#00CE21]'>

        //                 <CheckCircledIcon width={18} height={18} />
        //             </div>
        //             <span>Yes</span>
        //         </div>,
        //     header: () => <span>Suggested Deal</span>,
        //     footer: info => info.column.id,
        //     size: 300,
        //     minSize: 300
        // }),
        columnHelper.accessor(row => row.domain, {
            id: 'Import',
            cell: info => {
                const createdMemberBenefit = isBenefitCreator(memberBenefits[info.row.index].id)
                if (createdMemberBenefit) {
                    return <div></div>
                }
                return (
                    <>
                        <Toggle
                            checked={memberBenefits[info.row.index].import ?? false}
                            onChange={async (checked) => {
                                await importMutation.mutateAsync({ benefit: memberBenefits[info.row.index], importStatus: checked })
                            }}
                        />
                        {importMutation.isPending && importMutation.variables.benefit.id === memberBenefits[info.row.index].id && <LoadingIcon />}
                    </>

                )
            },
            header: () => <div className='flex gap-1 items-center'>
                <span>Import</span>
                <Tooltip content={"Show this deal on your dealbook."} trigger={<InfoCircledIcon />} />
            </div>,
            footer: info => info.column.id,
            size: 300,
            minSize: 300
        }),
        // columnHelper.accessor(row => row.offer, {
        //     id: 'Offer',
        //     cell: info => info.getValue(),
        //     header: () => <span>Offer</span>,
        //     footer: info => info.column.id,
        // }),
        // columnHelper.accessor(row => row.location, {
        //     id: 'Visibility',
        //     cell: info => {
        //         const memberBenefit = memberBenefits[info.row.index]
        //         if (!isBenefitCreator(memberBenefit.id)) {
        //             return <Badge size={"md"} color={"primary"} >{t(`memberbenefit.visibility.${memberBenefit.visibility}`)}</Badge>
        //         }
        //         return <Dropdown
        //             id='visibility'
        //             name='visibility'
        //             options={_.keys(MemberBenefitVisibility).map(key => ({ value: key, label: t(`memberbenefit.visibility.${key}`) }))}
        //             value={memberBenefit.visibility}
        //             onChange={async (value) => {
        //                 try {
        //                     await updateMemberBenefit({ ...memberBenefit, visibility: value })
        //                     setMemberBenefits(memberBenefits.map(b => memberBenefit.id === b.id ? { ...memberBenefit, visibility: value } : b))
        //                     customToast.success(`${memberBenefit.title} visibility updated to ${t(`memberbenefit.visibility.${value}`)}`)
        //                 } catch (error) {
        //                     customToast.error('Failed to update visibility')
        //                 }
        //             }}
        //         />
        //     }
        // }),
        columnHelper.display({
            id: 'Actions',
            cell: info => {
                const memberBenefit = memberBenefits[info.row.index]
                const createdMemberBenefit = isBenefitCreator(memberBenefits[info.row.index].id)
                return (<div className='flex justify-start gap-2'>
                    {createdMemberBenefit && <>
                        <Button icon={<Pencil1Icon width={20} height={20} />} size='md' onClick={() => {

                            setMemberBenefitModal(true)
                            setTobeEditedMemberBenefit(memberBenefit)
                        }}
                            className=' bg-transparent p-0 hover:bg-transparent focus:outline-none text-[#7C7C7C]'
                        />
                        <Button icon={<DeleteIcon />} size='md' onClick={() => {
                            setModalOpen(true)
                            setToBeDeletedMemberBenefitId(memberBenefit.id)
                        }} className='text-[#7C7C7C] bg-transparent p-0 hover:bg-transparent focus:outline-none focus:drop-shadow-none' variant='alert' label='' />
                    </>}
                    {!createdMemberBenefit && <Button
                        icon={<EyeOpenIcon width={20} height={20} />
                        } size='md' onClick={() => {
                            setShowBenefitDetailsModal(memberBenefit.id)
                        }}
                        className=' bg-transparent p-0 hover:bg-transparent focus:outline-none text-[#7C7C7C]'
                    />}
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
        // getPaginationRowModel: getPaginationRowModel(),     //load client-side pagination code
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        state: {
            // pagination

        },
    });





    const handleDelete = async (memberBenefitId: string) => {
        try {

            // check if the user is the creator of the deal
            const memberBenefit = memberBenefits.find(memberBenefit => memberBenefit.id === memberBenefitId)
            if (memberBenefit?.userId !== session.data?.user?.id) {
                await deleteOtherMemberBenefit(memberBenefitId, session.data?.user?.id! as string)
                setMemberBenefits(memberBenefits.filter(memberBenefit => memberBenefit.id !== memberBenefitId))
            } else {
                await deleteMemberBenefit(memberBenefitId)
                setMemberBenefits(memberBenefits.filter(memberBenefit => memberBenefit.id !== memberBenefitId))
                customToast.success('Deal deleted successfully')
            }
        } catch (error) {
            customToast.error('Failed to delete deal')
        }
        finally {
            setToBeDeletedMemberBenefitId('')
        }
    }


    return (
        <div className='h-full min-h-[100vh]  px-5 py-4 pb-20 lg:pb-4  lg:px-12'>

            <div className=' flex flex-row justify-between items-start mt-8 mb-6 gap-4'>

                {/* <Pagination
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
/> */}
                <Button label='Create Deal' icon={<PlusIcon />} className='w-fit' variant='primary' onClick={() => setMemberBenefitModal(true)} />
                <TableFilter filter={filter} onFilterChange={onFilterChange} />

            </div>
            <div className='flex w-full justify-end relative  '>
                <InputField placeholder='Search' name='search' leadingIcon={searchLoading ? <LoadingIcon size='xs' /> : <MagnifyingGlass />}
                    id='search' value={search} onChange={(e) => {
                        setSearched(false)
                        setSearch(e.target.value)
                    }} className='border-none outline-none hover:border-none focus:border-none
                             !px-8 !shadow-none !mb-2'
                    customLeadingIconClassName='!left-[8px] !top-[13px] !mr-2 ' />

                <Button
                    className=' absolute right-3 top-1'
                    size={"md"}
                    variant={"primary"}
                    onClick={() => {
                        handleSearch();
                    }}
                    label='Search'
                />

            </div>
            <div className='flex flex-col relative pb-28 lg:pb-0'>

                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHeadCell key={header.id} className={cn("w-20",
                                            { "!min-w-64 w-64": header.id.includes('Description') },
                                            { "!min-w-32 w-32": header.id.includes('Import') },
                                        )}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHeadCell>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => {
                            console.log(row.getVisibleCells())
                            return (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        console.log(cell.id)
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

            </div>
            <ConfirmationModal
                icon={
                    <div className='p-2 w-fit bg-gradient-to-b from-red-100 to-red-200  text-red-500
            rounded-[32px] border border-grey-200'>
                        <DeleteIcon />
                    </div>
                }
                isOpen={modalOpen} onClose={() =>
                    setModalOpen(false)

                } title={
                    isBenefitCreator(toBeDeletedMemberBenefitId) ? 'Delete Deal?' : 'Hide this deal from your customers'
                } description={
                    isBenefitCreator(toBeDeletedMemberBenefitId) ? 'This action is irreversible' : 'You can show again by importing from the marketplace'}>
                <>
                    <Button variant='secondary' label='Cancel' onClick={() => setModalOpen(false)} />
                    <Button variant='alert' label={
                        isBenefitCreator(toBeDeletedMemberBenefitId) ?
                            'Delete Deal' : 'Hide Deal'} onClick={() => {
                                handleDelete(toBeDeletedMemberBenefitId)
                                setModalOpen(false)
                            }}
                    />
                </>
            </ConfirmationModal>
            {
                memberBenefitModal && <AddMemberBenefitModal
                    isOpen={memberBenefitModal}
                    loading={loading}
                    categories={categories}

                    editMemberBenefit={tobeEditedMemberBenefit}
                    onClose={() => {
                        setMemberBenefitModal(false)
                        setTobeEditedMemberBenefit(undefined)
                    }
                    }
                    onUpdate={async (data: any) => {
                        try {
                            setLoading(true)
                            const updatedMemberBenefit = await updateMemberBenefit({
                                id: data.id,
                                categoryId: categories[0].id,
                                code: data.code,
                                domain: data.domain,
                                location: data.location,
                                description: data.description,
                                link: data.link,
                                userId: session.data?.user?.id! as string,
                                title: data.name,
                                offer: data.offer,
                                visibility: data.visibility,
                                dealType: data.deal_type,
                                pageConfigId: config.id,
                                partnershipTypes: data.partnership_types.join(',')
                            } as MemberBenefitWithImport)
                            if (data.imageURL && data.imageURL !== updatedMemberBenefit.imageURL) {
                                const response = await uploadImage(data, updatedMemberBenefit)
                                updatedMemberBenefit.imageURL = response.downloadUrl?.publicUrl ?? ""
                                await updateMemberBenefit(updatedMemberBenefit)
                            }
                            setMemberBenefits(memberBenefits.map(memberBenefit => memberBenefit.id === updatedMemberBenefit.id ? updatedMemberBenefit : memberBenefit))
                            setMemberBenefitModal(false)
                            setTobeEditedMemberBenefit(undefined)
                            customToast.success('Deal updated successfully')
                        } catch (error) {
                            console.log(error)
                            customToast.error('Failed to update deal')
                        } finally {
                            setLoading(false)
                        }

                    }}
                    onCreate={async (data: any) => {
                        try {
                            setLoading(true)
                            const userId = session.data?.user?.id! as string


                            const newMemberBenefit = await createMemberBenefit({
                                categoryId: categories[0].id,
                                code: data.code,
                                domain: data.domain,
                                location: data.location,
                                description: data.description,
                                link: data.link,
                                userId: userId,
                                title: data.title,
                                imageURL: data.imageURL,
                                offer: data.offer,
                                visibility: data.visibility,
                                dealType: data.deal_type,
                                partnershipTypes: data.partnership_types.join(','),
                                pageConfigId: config.id
                            } as MemberBenefitWithImport)
                            if (data.imageURL) {
                                const response = await uploadImage(data, newMemberBenefit)
                                newMemberBenefit.imageURL = response.downloadUrl?.publicUrl ?? ""
                                await updateMemberBenefit(newMemberBenefit)
                            }
                            customToast.success('Deal added successfully')
                            setMemberBenefits([newMemberBenefit, ...memberBenefits])
                            setMemberBenefitModal(false)
                            setTobeEditedMemberBenefit(undefined)

                        } catch (error) {
                            customToast.error('Failed to create a new deal')
                        } finally {
                            setLoading(false)
                        }
                    }}
                />
            }
            {
                showBenefitDetailsModal && <ViewBenefitDetailsModal

                    handleImportBenefit={async (checked) => {
                        await importMutation.mutateAsync({ benefit: memberBenefits.find(b => b.id === showBenefitDetailsModal) as MemberBenefitWithImport, importStatus: checked })
                    }}
                    isloading={importMutation.isPending && importMutation.variables.benefit.id === showBenefitDetailsModal}
                    memberBenefit={memberBenefits.find(b => b.id === showBenefitDetailsModal) as MemberBenefitWithImport}
                    isOpen={true}
                    category={categories.find(c => c.id === memberBenefits.find(b => b.id === showBenefitDetailsModal)?.categoryId)?.name as string}
                    onClose={() => setShowBenefitDetailsModal(undefined)}
                />
            }
        </div >
    )
}

export default MemberBenefitsTable