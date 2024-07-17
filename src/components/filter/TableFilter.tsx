'use client'
import React, { useEffect } from 'react'
import Button from '../atomic/button/Button'
import { Filter } from '@/lib/types'
import FilterIcon from '@/icons/filter-icon.svg'
import _ from 'lodash'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import CheckboxGroup from '../atomic/checkbox/CheckboxGroup'
import { cn } from '@/utils/cn'
interface TableFilterProps {
    filter: Filter
    onFilterChange?: (filter: Filter) => void
}
const TableFilter = ({ filter: defaultFilter, onFilterChange }: TableFilterProps) => {
    const [showFilter, setShowFilter] = React.useState(false)
    const [selectedFilter, setSelectedFilter] = React.useState('')
    const [filter, setFilter] = React.useState<Filter>(defaultFilter)
    useEffect(() => {
        onFilterChange && onFilterChange(filter)
    }, [filter])
    return (
        <div className='relative flex flex-col  justify-center items-end'>
            <Button
                onClick={() => {
                    setShowFilter(!showFilter)
                }}
                variant={'secondary'}
                icon={<FilterIcon />}
                label='Filter'
            />
            {showFilter && (
                <div className='absolute font-satoshi text-sm top-12 z-30 shadow-xl bg-white rounded-lg border-[#ECECEC] border-[1px] p-4'>
                    {_.keys(filter).map((key: any) =>
                        <>
                            <div className={cn('relative rounded-lg cursor-pointer flex justify-between  items-center w-44 px-4 py-[10px]', { 'bg-[#F0F0F0]': selectedFilter == key })}
                                onClick={() => {
                                    setSelectedFilter(selectedFilter == key ? '' : key)
                                }}
                            >
                                <label className='capitalize text-sm'>{key.replace("_", " ")}</label>
                                <ChevronRightIcon width={20} height={20} />
                            </div>
                            {selectedFilter == key &&
                                <div className='absolute top-0 -left-32 z-30 shadow-xl  break bg-white rounded-lg border-[#ECECEC] border-[1px] p-4 '>
                                    <CheckboxGroup
                                        name={key}
                                        id={key}
                                        value={filter[key].filter((f: any) => f.selected).map((f: any) => f.label)}
                                        options={filter[key].map((f: any) => ({ label: f.label, value: f.label }))}
                                        onChange={(selected) => {
                                            console.log(selected)
                                            setFilter({
                                                ...filter,
                                                [key]: filter[key].map((f: any) => ({
                                                    ...f,
                                                    selected: selected.includes(f.label)
                                                }))
                                            })
                                        }}
                                    />
                                </div>
                            }
                        </>

                    )}
                </div>
            )}
        </div>
    )
}

export default TableFilter