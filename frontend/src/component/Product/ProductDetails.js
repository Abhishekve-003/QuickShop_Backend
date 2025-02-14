import React, { Fragment, useState, useEffect } from "react";
import "./ProductDetails.css";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import {addItemsToCart } from "../../actions/cartAction";
import Carousel from "react-material-ui-carousel";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const params = useParams();

    const {product, loading, error} = useSelector((state) => state.productDetails);
    const {success, error: reviewError} = useSelector((state) => state.newReview);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if(product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if(1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id,quantity));
        alert.success("Item added to cart");
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);
        dispatch(newReview(myForm));
        setOpen(false);
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type: NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(params.id));
    },[dispatch,params.id,error,alert,reviewError, success]);

    const options = {
        size:"large",
        value:product.ratings,
        readOnly: true,
        precision:0.5
    }

    return(
        <Fragment>
            <MetaData  title={`${product.name} -- QuickShop`}/>
            {loading? <Loader /> : (
                <Fragment>
                <div className="ProductDetails">
                    <div className="part1">
                        <Carousel>
                            {product.images && product.images.map((item,i) => (<img className='CarouselImage' key={item.url} src={item.url} alt={`${i} Slide`}/>))}
                        </Carousel>
                    </div>
                    <div className="part2">
                        <div className="detailsBlock1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock2">
                            <Rating {...options} />
                            <span>({product.noOfReviews} Reviews)</span>
                        </div>
                        <div className="detailsBlock3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock3-1">
                                <div className="detailsBlock3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input type="number" value={quantity} readOnly/>
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button disabled={product.stock < 1 ? true : false} className="btn" onClick={addToCartHandler}>Add to Cart</button>
                            </div>
                            <p>Status:
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className="detailsBlock4">
                            Description: <p>{product.description}</p>
                        </div>
                        <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                    </div>
                </div>
                <div className="reviewContainer">
                    <h3 className="reviewHeading">Reviews</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map((review) => <ReviewCard key={review._id}  review={review}/>)}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </div>
            </Fragment>
            )}
        </Fragment>
    );
}

export default ProductDetails;