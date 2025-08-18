import { useState } from 'react'
import { useQueryParams } from '@/components/Utils/UseQueryParams'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type Paginations = {
  numberOfPages: number
}

export function Paginations({ numberOfPages }: Paginations) {
  const setQueryParam = useQueryParams()
  const [filters, setFilters] = useState({
    page: 1,
  })

  const handleFiltersChange = (name: string, value: number) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }))

    handleFilter(String(value))
  }

  const handleFilter = (value: string) => {
    setQueryParam({
      page: value,
    })
  }

  function getPageNumbers() {
    const pages: number[] = []

    if (numberOfPages <= 3) {
      for (let i = 1; i <= numberOfPages; i++) pages.push(i)
    } else if (filters.page <= 2) {
      pages.push(1, 2, 3)
    } else if (filters.page >= numberOfPages - 1) {
      pages.push(numberOfPages - 2, numberOfPages - 1, numberOfPages)
    } else {
      pages.push(filters.page - 1, filters.page, filters.page + 1)
    }

    return pages.filter(p => p >= 1 && p <= numberOfPages)
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            aria-disabled={filters.page === 1}
            tabIndex={filters.page === 1 ? -1 : 0}
            onClick={e => {
              e.preventDefault()
              if (filters.page > 1) {
                handleFiltersChange('page', filters.page - 1)
              }
            }}
            className={
              filters.page === 1
                ? 'pointer-events-none text-[--buttonSecondary]'
                : ''
            }
          />
        </PaginationItem>

        {pageNumbers[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href='#'
                onClick={e => {
                  e.preventDefault()
                  handleFiltersChange('page', 1)
                }}
                isActive={filters.page === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {pageNumbers[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href='#'
              isActive={page === filters.page}
              onClick={e => {
                e.preventDefault()
                handleFiltersChange('page', page)
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumbers[pageNumbers.length - 1] < numberOfPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < numberOfPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href='#'
                onClick={e => {
                  e.preventDefault()
                  handleFiltersChange('page', numberOfPages)
                }}
                isActive={filters.page === numberOfPages}
              >
                {numberOfPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href='#'
            aria-disabled={filters.page === numberOfPages}
            tabIndex={filters.page === numberOfPages ? -1 : 0}
            onClick={e => {
              e.preventDefault()
              if (filters.page < numberOfPages) {
                handleFiltersChange('page', filters.page + 1)
              }
            }}
            className={
              filters.page === numberOfPages
                ? 'pointer-events-none text-[--buttonSecondary]'
                : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
