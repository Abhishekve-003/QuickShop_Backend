import React, {Fragment, useEffect} from "react";
import "./UserList.css";
import {useSelector, useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllUsers , clearErrors, deleteUser} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {error, users, loading} = useSelector((state) => state.allUsers);
    const {error:deleteError, isDeleted, message} = useSelector((state) => state.profile);

    const rows = [];
    users && users.forEach((item) => {
        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name,
        });
    });

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllUsers());
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success(message);
            navigate("/admin/users");
            dispatch({type:DELETE_USER_RESET});
        }
    },[dispatch,alert,error,deleteError,isDeleted,navigate, message]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

return(
    <Fragment>
        <MetaData title={`All Users -- Admin`}/>
        <div className="dashboard">
        <Sidebar/>
        <div className="userListContainer">
        <h1 id="userListHeading">All Users</h1>
            {loading ? <Loader/> : 
            <table>
            <thead>
                <tr>
                    <th style={{width:"180rem"}}>User ID</th>
                    <th style={{width:"150rem"}}>Email</th>
                    <th style={{width:"100rem"}}>Name</th>
                    <th>Role</th>
                    <th style={{width:"100rem"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((val,i)=>
                <tr key={i}>
                    <th style={{width:"180rem"}} className="id">{val.id}</th>
                    <th style={{width:"150rem"}} className="id">{val.email}</th>
                    <th style={{width:"100rem"}}>{val.name}</th>
                    <th className={ (val.role === "admin") ? "greenColor" : "redColor"}>{val.role}</th>
                    <th style={{width:"100rem"}}>
                        <a href={`/admin/user/${val.id}`}><EditIcon/></a>
                        <Button onClick={() => deleteUserHandler(val.id)}><DeleteIcon/></Button>
                    </th>
                </tr>
                )}
            </tbody>
        </table>}
        </div>
    </div>
    </Fragment>
);
};

export default UserList;