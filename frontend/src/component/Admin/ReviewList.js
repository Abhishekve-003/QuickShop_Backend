import React, {Fragment, useEffect, useState} from "react";
import "./ReviewList.css";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, getAllReviews, deleteReviews} from "../../actions/productAction";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import { Button } from "@mui/material";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ReviewList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {error:deleteError, isDeleted} = useSelector((state) => state.review);
    const {error, reviews, loading} = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const rows = [];
    reviews && reviews.forEach((item) => {
        rows.push({
            id:item._id,
            user:item.name,
            comment:item.comment,
            rating:item.rating,
        });
    });

    useEffect(() => {
        if(productId.length === 24){
            dispatch(getAllReviews(productId));
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({type:DELETE_REVIEW_RESET});
        }
    },[dispatch,alert,error,deleteError,isDeleted,navigate,productId]);

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId,productId));
    }
    const productReivewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    }

return(
    <Fragment>
        <MetaData title={`All Reviews -- Admin`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productReviewsContainer">
            <form
                className='productReviewsForm'
                onSubmit={productReivewSubmitHandler}
            >
                        <h1 className="productReviewsFormHeading">All Reviews</h1>
                        <div>
                            <StarIcon/>
                            <input
                                type='text'
                                placeholder='Product Id'
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>
                        <Button
                            id='productReviewsBtn'
                            type='submit'
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>
                    {reviews && reviews.length > 0 ? 
                        (<table>
                        <thead>
                            <tr>
                                <th style={{width:"200rem"}}>Review ID</th>
                                <th style={{width:"100rem"}}>User</th>
                                <th style={{width:"100rem"}}>Comment</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((val,i)=>
                            <tr key={i}>
                                <th style={{width:"200rem"}} className="id">{val.id}</th>
                                <th style={{width:"100rem"}}>{val.user}</th>
                                <th style={{overflow:"hidden", width:"100rem"}}>{val.comment}</th>
                                <th className={ (val.rating >= 3) ? "greenColor" : "redColor"}>{val.rating}</th>
                                <th>
                                    <Button onClick={() => deleteReviewHandler(val.id)}><DeleteIcon/></Button>
                                </th>
                            </tr>
                            )}
                        </tbody>
                    </table>) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )
                    }
            </div>
        </div>
    </Fragment> 
);
};

export default ReviewList;