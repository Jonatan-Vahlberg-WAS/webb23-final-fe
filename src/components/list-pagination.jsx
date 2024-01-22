const { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } = require("./ui/pagination");


export function ListPagination({ page, next, previous }) {
    const nextClassName = next ? "" : "opacity-50 pointer-events-none"
    const previousClassName = previous ? "" : "opacity-50 pointer-events-none"
  return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={previous} className={previousClassName} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={next} className={nextClassName} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}