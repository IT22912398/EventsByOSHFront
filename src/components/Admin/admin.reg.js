
import React, { useState, useEffect } from 'react';
import {

    MDBBtn,
    MDBCardImage,
    MDBCard, MDBCardBody, MDBRow, MDBCol
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../main_parts/navbar.js';
import Footer from '../main_parts/footer.js';
import NumberFormat from 'react-number-format';
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function Admin_registration() {
    const [passwordShown, setPasswordShown] = useState(false);
    function showPassword() {
        setPasswordShown(passwordShown ? false : true);
    }

    schema
        .is().min(4)
        .is().max(100)
        .has().uppercase()
        .has().lowercase()
        .has().digits(2)
        .has().not().spaces()
        .is().not().oneOf(['Passw0rd', 'Password123']);

    const [isValidCFpassword, setIsValidCfpassword] = useState(false);
    const [isValidCFpassword2, setIsValidCfpassword2] = useState(false);
    const [messageCfpassword, setMessageCfpassword] = useState('');
    const [messageStrongpassword, setmessageStrongpassword] = useState('');
    const [password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [Registrationbtn, setRegistrationbtn] = useState(true);
    const [phone, setPhone] = useState("");
    const [userType, setUserType] = useState("");

    const setUserTypeFunction = (event) => {
        setUserType(event.target.value);
    }

    const setPasswordFunction = (event) => {
        if (schema.validate(event) === false) {
            setIsValidCfpassword2(false);
            setmessageStrongpassword('Password is not strong');

        } else {
            setIsValidCfpassword2(true);
            setmessageStrongpassword('Password is strong');

        }
        setPassword(event);
    }

    async function Registration(e) {
        e.preventDefault();

        const userReg = { userName, email, password, phone, userType };

        try {
            const response = await axios.post(
                `${global.APIUrl}/user/registerAdmin`,
                userReg
            );
            console.log(response);
            if (response.data.message !== "Email is Already Used") {

                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                    type: "success",
                }).then((okay) => {
                    if (okay) {
                        window.location.href = "/AdminLogin";
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: "Email Already Taken",
                    icon: "error",
                    confirmButtonText: "OK",
                    type: "success",
                });
                setTimeout(() => {
                    window.location.href = "/AdminReg";
                }, 3000);
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: "Registration Not Success",
                icon: "error",
                confirmButtonText: "OK",
                type: "success",
            });
            setTimeout(() => {
                window.location.href = "/AdminReg";
            }, 3000);
        }
    }



    const setCPasswordFnction = (event) => {
        const ConfirmPassword = event;

        if ((ConfirmPassword === password) && (ConfirmPassword !== '') && (ConfirmPassword !== null)) {
            setIsValidCfpassword(true);
            setMessageCfpassword('Password Are Matching');
            if ((userName.length > 0) && (ConfirmPassword.length > 0) && (ConfirmPassword.length > 0)) {
                setRegistrationbtn(false);
            } else {
                setRegistrationbtn(true);
            }
        } else {
            setIsValidCfpassword(false);
            setMessageCfpassword('Passwords Are Not Match');
            setRegistrationbtn(true);
        }
        setCPassword(event);
    };

    const registerBtn = () => {
        if ((userName !== '') && (phone !== '') && (email !== '') && (userType !== '') && (password !== '') && (CPassword !== '') && isValidCFpassword && isValidCFpassword2) {
            setRegistrationbtn(false)
        }
        else {
            setRegistrationbtn(true)
        }
    }

    useEffect(() => {
        registerBtn()
    }, [userName, phone, userType, email, password, CPassword])

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />
            <MDBRow style={{ marginTop: '1%', marginBottom: '10%', width: '99%' }}>
                <MDBCol sm='1'></MDBCol>
                <MDBCol sm='5'>
                    <MDBCard className="border-0 shadow-0">
                        <MDBCardImage style={{ width: '100%', marginTop: '35%' }} position='top' alt='...' src='https://t4.ftcdn.net/jpg/03/03/72/11/360_F_303721150_Uo6hxtfQVe7B9uxjwPLbgJ0eStClh0r2.jpg' />
                    </MDBCard>
                </MDBCol>
                <MDBCol sm='6'>
                    <MDBCard className="border-0 shadow-0 p-5">
                        <MDBCardBody className="pt-5 mt-3 text-left">
                            <div className="bg-light p-4">
                                <center><h1 className="text-uppercase">Admin Registration </h1></center>
                                <hr />

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "20px" }}><b>User Name</b></label>
                                    <input type="text" class="form-control"
                                        style={{ fontSize: "18px" }}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                        }} />
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "20px" }}><b>Email</b></label>
                                    <input type="email" class="form-control"
                                        style={{ fontSize: "18px" }}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} />
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "20px" }}><b>Phone Number</b></label>

                                    <NumberFormat format="0## ### ####" class="form-control" placeholder="0## ### ## ##" style={{ fontSize: "18px" }} onChange={(e) => {
                                        setPhone(e.target.value);
                                    }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "20px" }}><b>User Role</b></label>
                                    <select class="form-control" style={{ fontSize: "18px" }} onChange={setUserTypeFunction} value={userType}>
                                        <option value="">Select Admin Role</option>
                                        <option value="Admin">Admin</option>                                        
                                        <option value="Request Manager">Request Manager</option>                                        
                                        <option value="Sponsor Manager">Sponsor Manager</option>                                        
                                        <option value="Place Manager">Place Manager</option>                                        
                                        <option value="Crew Manager">Crew Manager</option>                                                                                                                     
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "20px" }}><b>Password</b></label>
                                    <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" style={{ fontSize: "18px" }} onChange={(e) => {
                                        setPasswordFunction(e.target.value);
                                    }} />
                                    <span style={{ fontSize: '12px', margin: '0px', padding: '0px' }} className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                        {messageStrongpassword}
                                    </span>
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "20px" }}><b>Retype Password</b></label>
                                    <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" style={{ fontSize: "18px" }} onChange={(e) => {
                                        setCPasswordFnction(e.target.value);
                                    }} />
                                    <span style={{ fontSize: '12px', margin: '0px', padding: '0px' }} className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                        {messageCfpassword}
                                    </span>
                                </div>
                                <div class="mt-3 mb-2">
                                    <div class="d-grid gap-2">
                                        <br />
                                        <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{ fontSize: "18px" }} disabled={Registrationbtn} onClick={Registration}>Register</MDBBtn>
                                    </div>
                                </div>

                                <center>
                                    <MDBRow >
                                        <MDBCol size='5'></MDBCol>
                                        <MDBCol size='5'></MDBCol>
                                        <MDBCol size='2'><a href="/AdminLogin" style={{ fontSize: "18px" }} class="text-muted">Sign In</a></MDBCol>
                                    </MDBRow>
                                </center>

                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <Footer />
        </div>
    )
};

export default Admin_registration;