import React, { useState, useEffect } from 'react';
import { MDBIcon, MDBBtn, MDBCol, MDBCard, MDBCardImage, MDBRow, MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';
import './APIUrl';

function UserLogin() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [disabled, setdisabled] = useState(true);

    const btn = () => {
        if ((email !== "") && (password !== "")) {
            setdisabled(false)
        }
        else {
            setdisabled(true)
        }
    }


    async function login(e) {
        e.preventDefault();

        let item = { email, password };
        console.log(item);
        try {
            const response = await axios.post(global.APIUrl + "/user/login", item);
            console.log(response.data.message);

            if (response.data.message === true) {
                sessionStorage.setItem("user_name", email);

                await Swal.fire({
                    title: "Success!",
                    text: "Login Success",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                });
                window.location.href = "/userAdminDashboard";
            } else {
                await Swal.fire({
                    title: "Error!",
                    text: "Login Not Success",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                });
                window.location.href = "/UserLogin";
            }
        } catch (error) {
            console.error(error);
            await Swal.fire({
                title: "Error!",
                text: "Login Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
            window.location.href = "/UserLogin";
        }
    }
    useEffect(() => {
        btn()
    }, [email, password])
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
                <MDBCol sm='6'>
                    <MDBCard className="border-0 shadow-0">
                        <MDBCardImage style={{ width: '99%', marginTop: '15%' }} position='top' alt='...' src='https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
                    </MDBCard>
                </MDBCol>
                <MDBCol sm='5'>
                    <MDBCard className="border-0 shadow-0 p-5">
                        <MDBCardBody className="pt-5 mt-3 text-left">
                            <div className="bg-light p-4">
                                <center><h1 className="text-uppercase">Sign In</h1></center>
                                <br />
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "18px" }}>Email </label>
                                    <input class="form-control" type='email' id="pass" style={{ fontSize: "18px" }} onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "18px" }}>Password</label>
                                    <input class="form-control" type="password" id="pass" style={{ fontSize: "18px" }} onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} />
                                </div>

                                <div class="mt-3 mb-2">
                                    <div class="d-grid gap-2">
                                        <br />
                                        <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{ fontSize: "18px" }} disabled={disabled} onClick={login}>Login</MDBBtn>
                                    </div>
                                </div>

                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <Footer />
        </div>
    )
};

export default UserLogin;