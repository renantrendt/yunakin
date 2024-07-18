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
import { Category, MemberBenefit, MemberBenefitPageConfig } from '@prisma/client'
import AddCategoryModal from '../molecules/add-category-modal'
import { createCategory, createMemberBenefit, deleteCategory, deleteMemberBenefit, deleteOtherMemberBenefit, importBenefit, updateMemberBenefit } from '@/app/actions'
import AddMemberBenefitModal from '../molecules/add-memberbenefit-modal'
import { Row } from '@react-email/components'
import { getDownloadUrl, uploadFile } from '@/lib/storage/storage'
import platformConfig from '@/config/app-config'

import EditIcon from "@/icons/edit-icon.svg"
import { useSearchParams } from 'next/navigation'
import { Filter, MemberBenefitVisibility, MemberBenefitWithImport, PartnershipType } from '@/lib/types'
import _, { set } from 'lodash'
import { useTranslation } from '@/lib/i18n/client'
import Image from 'next/image'
import Toggle from '../atomic/toggle/Toggle'
import { CheckCircledIcon, Pencil2Icon, PlusIcon, EyeOpenIcon, Pencil1Icon } from '@radix-ui/react-icons'
import TableHeadCell from './table/TableHeadCell'
import TableFilter from '../filter/TableFilter'
import ViewBenefitDetailsModal from '../molecules/view-benefit-details/ViewBenefitDetailsModal'
interface MemberBenefitsTableProps {
    memberBenefits: MemberBenefitWithImport[]
    categories: Category[]
    config?: MemberBenefitPageConfig
}

const MemberBenefitsTable = ({ memberBenefits: defaultMemberBenefits, config, categories }: MemberBenefitsTableProps) => {
    const { t } = useTranslation('dashboard')
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
    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState(false)
    const debouncedValue = useDebounce(search, 500)

    const [filter, setFilter] = useState<Filter>({
        category: categories.map(category => ({ label: category.name, selected: false })),
        imported: [{ label: 'Imported', selected: false, }, { label: 'Not Imported', selected: false, }],
        partnership_types: _.keys(PartnershipType).map(key => ({ label: key, selected: false })),
    })
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
    useEffect(() => {

    }, [debouncedValue])

    const isBenefitCreator = (memberBenefitId: string) => {
        const memberBenefit = memberBenefits.find(memberBenefit => memberBenefit.id === memberBenefitId)
        return memberBenefit?.userId === session.data?.user?.id
    }
    const columns = [
        columnHelper.accessor(row => row.title, {
            id: 'Image',
            cell: info => {
                const memberBenefit = memberBenefits[info.row.index]
                const image = memberBenefit.imageURL && `${memberBenefit.imageURL}` || `/images/dummy_logo.svg`
                return (
                    <Image className='hover:scale-105  w-12 h-12 flex-shrink-0 rounded-[14px] border border-[#EBEBEB] duration-300 ease-in-out' src={image} alt="Benefit" width={520} height={360} objectFit=' contain' />
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
            header: () => <span>Featured</span>,
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
                    <Toggle
                        checked={memberBenefits[info.row.index].import}
                        onChange={async (checked) => {
                            const currBenefit = memberBenefits[info.row.index]
                            try {
                                setMemberBenefits(memberBenefits.map(b => b.id === currBenefit.id ? { ...currBenefit, import: checked } : b))
                                await importBenefit(currBenefit.id, checked)
                                if (checked) {
                                    customToast.success('Deal imported successfully')
                                } else {
                                    customToast.success('Deal removed successfully')
                                }
                            } catch (error) {
                                customToast.error('Failed to update import status')
                                setMemberBenefits(memberBenefits.map(b => b.id === currBenefit.id ? { ...currBenefit, import: !checked } : b))
                            }
                        }}
                    />
                )
            },
            header: () => <span>Import</span>,
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

            // check if the user is the creator of the member benefit
            const memberBenefit = memberBenefits.find(memberBenefit => memberBenefit.id === memberBenefitId)
            if (memberBenefit?.userId !== session.data?.user?.id) {
                await deleteOtherMemberBenefit(memberBenefitId, session.data?.user?.id! as string)
                setMemberBenefits(memberBenefits.filter(memberBenefit => memberBenefit.id !== memberBenefitId))
            } else {
                await deleteMemberBenefit(memberBenefitId)
                setMemberBenefits(memberBenefits.filter(memberBenefit => memberBenefit.id !== memberBenefitId))
                customToast.success('Member Beenfit deleted successfully')
            }
        } catch (error) {
            customToast.error('Failed to delete member benefit')
        }
        finally {
            setToBeDeletedMemberBenefitId('')
        }
    }


    return (
        <div className='h-full min-h-[100vh]  px-5 py-4   lg:px-12'>
            {/* <div className='flex w-full justify-end my-4 '>
                <InputField placeholder='Search' name='search' leadingIcon={<MagnifyingGlass />}
                    id='search' value={search} onChange={(e) => {
                        setSearched(false)
                        setSearch(e.target.value)
                    }} className='border-none outline-none hover:border-none focus:border-none
                             !px-8 !shadow-none !mb-2' customLeadingIconClassName='!left-[8px] !top-[14px] ' />
            </div> */}
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
            <div className='flex flex-col relative'>

                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHeadCell key={header.id} className={`${header.id.includes('Description') ? "!min-w-64 !w-64" : "!w-20"}`}>
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
                isOpen={modalOpen} onClose={() => setModalOpen(false)} title={
                    isBenefitCreator(toBeDeletedMemberBenefitId) ? 'Delete Member Benefit?' : 'Hide this benefit for your members'
                } description={
                    isBenefitCreator(toBeDeletedMemberBenefitId) ? 'This action is irreversible' : 'You can show again by selecting on the catalog'}>
                <>
                    <Button variant='secondary' label='Cancel' onClick={() => setModalOpen(false)} />
                    <Button variant='alert' label={
                        isBenefitCreator(toBeDeletedMemberBenefitId) ?
                            'Delete Member Benefit' : 'Hide Member Benefit'} onClick={() => {
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
                    onClose={() => setMemberBenefitModal(false)}
                    onUpdate={async (data: any) => {
                        try {
                            setLoading(true)
                            const updatedMemberBenefit = await updateMemberBenefit({
                                id: data.id,
                                categoryId: data.categoryId,
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
                                partnershipTypes: data.partnership_types.join(',')
                            } as MemberBenefitWithImport)
                            if (data.imageURL && data.imageURL !== updatedMemberBenefit.imageURL) {
                                const blob = await fetch(data.imageURL).then(r => r.blob());
                                const random = Math.floor(Math.random() * 10)
                                const imageType = data.imageType

                                const path = "memberbenefits_images/" + updatedMemberBenefit.id + "/" + `image-${random}.${imageType ?? 'jpg'}`
                                const file = new File([blob], `image.${imageType ?? 'jpg'}`, { type: imageType.includes('svg') ? "image/svg+xml" : "image/jpeg" });
                                const isUploaded = await uploadFile(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path, file, { cacheControl: '3600', upsert: true })
                                if (!isUploaded) {
                                    throw new Error("Failed to upload image")
                                }
                                const downloadUrl = await getDownloadUrl(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path)
                                if (!downloadUrl) {
                                    throw new Error("Failed to get download url")
                                }
                                updatedMemberBenefit.imageURL = downloadUrl.publicUrl
                                await updateMemberBenefit(updatedMemberBenefit)
                            }
                            setMemberBenefits(memberBenefits.map(memberBenefit => memberBenefit.id === updatedMemberBenefit.id ? updatedMemberBenefit : memberBenefit))
                            setMemberBenefitModal(false)
                            setTobeEditedMemberBenefit(undefined)
                            customToast.success('Member Benefit updated successfully')
                        } catch (error) {
                            customToast.error('Failed to update member benefit')
                        } finally {
                            setLoading(false)
                        }

                    }}
                    onCreate={async (data: any) => {
                        try {
                            setLoading(true)
                            const userId = session.data?.user?.id! as string


                            const newMemberBenefit = await createMemberBenefit({
                                categoryId: data.categoryId,
                                code: data.code,
                                domain: data.domain,
                                location: data.location,
                                description: data.description,
                                link: data.link,
                                userId: userId,
                                title: data.name,
                                imageURL: data.imageURL,
                                offer: data.offer,
                                visibility: data.visibility,
                                dealType: data.deal_type,
                                partnershipTypes: data.partnership_types.join(','),
                            } as MemberBenefitWithImport)
                            if (data.imageURL) {
                                const blob = await fetch(data.imageURL).then(r => r.blob());
                                const random = Math.floor(Math.random() * 10)
                                const imageType = data.imageType

                                const path = "memberbenefits_images/" + newMemberBenefit.id + "/" + `image-${random}.${imageType ?? 'jpg'}`
                                const file = new File([blob], `image.${imageType ?? 'jpg'}`, { type: imageType.includes('svg') ? "image/svg+xml" : "image/jpeg" });
                                const isUploaded = await uploadFile(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path, file, { cacheControl: '3600', upsert: true })
                                if (!isUploaded) {
                                    throw new Error("Failed to upload image")
                                }
                                const downloadUrl = await getDownloadUrl(platformConfig.variables.SUPABASE_BUCKET_NAME as string, path)
                                if (!downloadUrl) {
                                    throw new Error("Failed to get download url")
                                }
                                newMemberBenefit.imageURL = downloadUrl.publicUrl
                                await updateMemberBenefit(newMemberBenefit)
                            }
                            customToast.success('Member Benefit added successfully')
                            setMemberBenefits([newMemberBenefit, ...memberBenefits])
                            setMemberBenefitModal(false)

                        } catch (error) {
                            customToast.error('Failed to create a new member benefit')
                        } finally {
                            setLoading(false)
                        }
                    }}
                />
            }
            {
                showBenefitDetailsModal && <ViewBenefitDetailsModal
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