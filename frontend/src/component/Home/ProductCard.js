import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";


const ProductCard = ({product}) => {
    const options = {
        size:"large",
        value:product.ratings,
        readOnly: true,
        precision:0.5
    }
    return(
        <Link to={{pathname:`/product/${product._id}`}} style={{textDecoration:'none'}}>
            <div className="productCard">
                <img src={product.images[0].url} alt={product.name}/>
                <p>{product.name}</p>
                <div>
                    <Rating {...options}/> <span>({product.noOfReviews} Reviews)</span>
                </div>
                <span>{`₹${product.price}`}</span>
            </div>
        </Link>
    );
}

export default ProductCard;
