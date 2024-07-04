import React, { Fragment , useState, useEffect} from "react";
import "./ResetPassword.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import {useDispatch , useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useAlert} from "react-alert";
import {resetPassword, clearErrors} from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();
   
    const {error, loading , success} = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        console.log(password);
        console.log(myForm);
        console.log(params.token);
        dispatch(resetPassword(params.token, myForm));
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        } 
        if(success){
            alert.success("Password Updated Successfully");
            navigate("/login");
        }
    },[dispatch, error, success, alert, navigate]);
    return(
            <Fragment>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <MetaData title="Change Password"/>
                            <div className="resetPasswordContainer">
                                    <div className="resetPasswordBox">
                                        <h1>Update Password</h1>
                                        <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                                            <div>
                                                <LockOpenIcon />
                                                <input 
                                                    type="password"
                                                    placeholder="New Password"
                                                    required
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <LockIcon />
                                                <input 
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    required
                                                    name="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                            <input 
                                                type="submit"
                                                value="Update"
                                                className="resetPasswordBtn"
                                            />
                                        </form>
                                    </div>
                            </div>
                    </Fragment>
                )}
            </Fragment>
        );
}

export default ResetPassword;