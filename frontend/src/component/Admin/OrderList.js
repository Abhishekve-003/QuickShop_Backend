import React, {Fragment, useEffect} from "react";
import "./OrderList.css";
import {useSelector, useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteOrder, getAllOrders, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader/Loader";

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {error, orders, loading} = useSelector((state) => state.allOrders);
    const {error:deleteError, isDeleted} = useSelector((state) => state.order);

    const rows = [];
    orders && orders.forEach((item) => {
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus,
        });
    });

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllOrders());
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({type:DELETE_ORDER_RESET});
        }
    },[dispatch,alert,error,deleteError,isDeleted,navigate]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

return(
    <Fragment>
        <MetaData title={`All Orders -- Admin`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="orderListContainer">
                {loading ? ( 
                    <Loader/> 
                ) : 
                    orders.length === 0 ? (
                        <div className="noOrders">
                            <p>No Any Order Yet.</p>
                        </div>
                    ) : (
                    <div>
                    <h1 id="orderListHeading">All Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th style={{width:"180rem"}}>ID</th>
                        <th>Status</th>
                        <th>Items Qty</th>
                        <th>Amount</th>
                        <th style={{width:"100rem"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((val,i)=>
                        <tr key={i}>
                        <th style={{width:"180rem"}} className="id">{val.id}</th>
                        <th className={ (val.status === "Delivered") ? "greenColor" : "redColor"}>{val.status}</th>
                        <th>{val.itemsQty}</th>
                        <th>{val.amount}</th>
                        <th style={{width:"100rem"}}>
                            <a href={`/admin/order/${val.id}`}><EditIcon/></a>
                            <Button onClick={() => deleteOrderHandler(val.id)}><DeleteIcon/></Button>
                        </th>
                    </tr>
                    )}
                </tbody>
            </table>
                </div> )
                }
            </div>
        </div>
    </Fragment>
);
};

export default OrderList;