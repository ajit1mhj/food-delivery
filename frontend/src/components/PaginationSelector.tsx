import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props={
    page:number;
    pages:number;
    onPageChange: (page:number)=> void;
}

const PaginationSelector = ({page, pages,onPageChange}:Props)=>{
    const PageNumbers =[];
    for (let i =1;i<=pages;i++){
        PageNumbers.push(i);
    }
    return(
        <Pagination>
            <PaginationContent>

                {page !== 1 && (
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
            </PaginationItem>
          )}
  
                {PageNumbers.map((number)=>(
                    <PaginationItem>
                        <PaginationLink href="#" onClick={()=>onPageChange(number)}
                         isActive={page === number}>{number}</PaginationLink>
                    </PaginationItem>
                ))}

                {page!== PageNumbers.length &&(
                    <PaginationItem>
                        <PaginationNext href="#" onClick={()=> onPageChange(page +1 )}/>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSelector;