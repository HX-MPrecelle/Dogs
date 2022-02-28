import React from "react";

const Pagination = ({dogsPerPage, dogs, pagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dogs/dogsPerPage); i++) {
        pageNumbers.push(i);        
    }

    console.log(pageNumbers);
    return ( 
        <nav>
            <ul>
                {
                    pageNumbers?.map(number => (
                        <li key={number}>
                            <a onClick={() => pagination(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
     );
}
 
export default Pagination;