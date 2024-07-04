
import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { FaMouse } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard.js";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import {useAlert} from 'react-alert';


const Home = () => {  
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products} = useSelector((state) => state.products);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    },[dispatch, error, alert]);

    return(
        <Fragment>
            {loading ? (
                <Loader />
            ):(
                <Fragment>
            <MetaData title="QuickShop"/>
            <div className="banner">
                <p>Welcome to QuickShop</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button>
                        Scroll <FaMouse />
                    </button>
                </a>
            </div>
            <div className="homeHeading">
                <h2>Featured Products</h2>
                <div className="container" id="container">
                    {products && products.map((product) => <ProductCard key={product.name} product={product}/>)}
                </div>
            </div>
        </Fragment>
            )}
        </Fragment>
    );
}

export default Home;





