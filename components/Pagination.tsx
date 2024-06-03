import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const PaginationComponent = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {pageNumbers.map((number) => (
          <PaginationItem key={number} className="text-white">
            <PaginationLink
              onClick={() => paginate(number)}
              href="#"
              className={`${
                number === currentPage ? "bg-teal-300 text-black" : ""
              }`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
