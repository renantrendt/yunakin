import React from 'react'

interface PaginationProps {
    totalPages: number
    previousButton?: boolean
    nextButton?: boolean
    previousButtonDisabled?: boolean
    nextButtonDisabled?: boolean
    onPreviousClick?: () => void
    onNextClick?: () => void
    onPageClick?: (pageNumber: number) => void
}

const PaginationItem = ({ pageNumber, disabled = false, onClick }: { pageNumber: number | string, disabled?: boolean, icon?: React.ReactNode, onClick?: () => void }) => {
    return (
        <button disabled={disabled} onClick={onClick} className='py-[10px] disabled:bg-grey-200 text-sm leading-5 font-normal px-4 flex justify-center items-center cursor-pointer hover:bg-grey-100 gap-2 border-r-[1px] border-grey-300 last:border-none'>{pageNumber}</button>
    )
}

const Pagination = ({ totalPages, previousButton, previousButtonDisabled, nextButtonDisabled, nextButton, onPreviousClick, onNextClick, onPageClick }: PaginationProps) => {

    if (totalPages <= 1) return null

    const pageNumbers: (number | string)[] = Array.from({ length: totalPages }, (_, i) => i + 1)

    if (totalPages > 5) {
        pageNumbers[Math.floor(totalPages / 2) - 1] = '...'
    }

    // const pageNumbers = [firstPage, firstPage + 1, firstPage + 2, "...", lastPage - 2, lastPage - 1, lastPage]

    return (
        <div className='text-black flex justify-center w-fit rounded-lg border-[1px] border-grey-300 shadow-sm bg-white   '>
            {previousButton && <PaginationItem
                disabled={previousButtonDisabled}
                onClick={onPreviousClick} pageNumber={'Previous'} />}
            {pageNumbers.map((pageNumber, index) => {
                return <PaginationItem
                    key={index} onClick={() => {
                        if (typeof pageNumber === 'number') {
                            onPageClick && onPageClick(pageNumber)
                        }
                    }} pageNumber={pageNumber} />
            })}
            {nextButton && <PaginationItem
                disabled={nextButtonDisabled}
                onClick={onNextClick} pageNumber={'Next'} />}
        </div>
    )
}

export default Pagination