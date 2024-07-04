import React, {Fragment, useEffect} from "react";
import "./ProductList.css";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, deleteProduct, getAdminProduct} from "../../actions/productAction";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader/Loader";

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {error, products, loading} = useSelector((state) => state.products);
    const {error:deleteError, isDeleted} = useSelector((state) => state.product);

    const rows = [];
    products && products.forEach((item) => {
        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name,
        });
    });

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAdminProduct());
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({type:DELETE_PRODUCT_RESET});
        }
    },[dispatch,alert,error,deleteError,isDeleted,navigate]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

return(
    <Fragment>
        <MetaData title={`All Products -- Admin`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                
                {loading ? <Loader/> : 
                    products.length === 0 ? (
                        <div className="noProducts">
                            <p>No Any Product Yet.</p>
                        </div>
                    ) : (
                        <div>
                <h1 id="productListHeading">All Products</h1>
                <table>
                <thead>
                    <tr>
                        <th style={{width:"180rem"}}>Product ID</th>
                        <th style={{width:"100rem"}}>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th style={{width:"100rem"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((val,i)=>
                    <tr key={i}>
                        <th style={{width:"180rem"}} className="id">{val.id}</th>
                        <th style={{width:"100rem"}}>{val.name}</th>
                        <th>{val.stock}</th>
                        <th>{val.price}</th>
                        <th style={{width:"100rem"}}>
                            <a href={`/admin/product/${val.id}`}><EditIcon/></a>
                            <Button onClick={() => deleteProductHandler(val.id)}><DeleteIcon/></Button>
                        </th>
                    </tr>
                    )}
                </tbody>
            </table>
            </div>
                    )
                }
            </div>
        </div>
    </Fragment>
);
};

export default ProductList;