import React from 'react'

interface PaginationProps{
    cardsPerPage : number;
    totalCards : number;
    paginate: (pageNumber:number) => void ;
}

export const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(props.totalCards / props.cardsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className = "pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => props.paginate(number)} href ='!#' className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
