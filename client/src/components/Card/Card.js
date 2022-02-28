import React from "react";
import { Link } from "react-router-dom";

const Card = ({name, image, temperaments, id}) => {
    return ( 
        <div>
            <Link to={`/dogs/${id}`}>
            <div>
                <img src={image} alt="img not found" width="200px" height="250px" />
                <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                <div>
                    {
                        temperaments?.map((e, k) => {
                            return (
                                <div>
                                    <p>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            </Link>
        </div>
     );
}
 
export default Card;