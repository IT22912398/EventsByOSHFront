import React, { useState, useEffect } from 'react';
import { MDBIcon, MDBBtn, MDBCol, MDBCard, MDBCardImage, MDBRow, MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../main_parts/navbar.js';
import Footer from '../main_parts/footer.js';
import '../APIUrl';

function AdminLogin() {
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
            const response = await axios.post(global.APIUrl + "/user/loginAdmin", item);
            console.log(response.data.message);

            if (response.data.message === true) {
                sessionStorage.setItem("admin_name", email);

                await Swal.fire({
                    title: "Success!",
                    text: "Login Success",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                });
                window.location.href = "/Admin";
            } else {
                await Swal.fire({
                    title: "Error!",
                    text: "Login Not Success",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                });
                window.location.href = "/AdminLogin";
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
            window.location.href = "/AdminLogin";
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
            <MDBRow style={{ marginTop: '10%', marginBottom: '10%', width: '99%' }}>

                <MDBCol sm='1'></MDBCol>

                <MDBCol sm='6'>
                    <MDBCard className="border-0 shadow-0">
                        <MDBCardImage style={{ width: '85%', marginTop: '15%' }} position='top' alt='...' src='https://www.pngitem.com/pimgs/m/226-2260470_transparent-admin-icon-png-admin-logo-png-png.png' />
                    </MDBCard>
                </MDBCol>

                <MDBCol sm='5'>
                    <MDBCard className="border-0 shadow-0 p-5">
                        <MDBCardBody className="pt-5 mt-3 text-left">

                            <div className="bg-light p-4">
                                <center><h1 className="text-uppercase">Admin Log In</h1></center>
                                <hr />
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "20px" }}><b>Email</b></label>
                                    <input class="form-control" id="pass" placeholder="" style={{ fontSize: "18px" }} onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} />
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label" style={{ fontSize: "20px" }}><b>Password</b></label>
                                    <input class="form-control" type="password" id="pass" placeholder="" style={{ fontSize: "18px" }} onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} />
                                </div>

                                <div class="mt-3 mb-2">
                                    <div class="d-grid gap-2">
                                        <br />
                                        <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{ fontSize: "18px" }} disabled={disabled} onClick={login}>Login</MDBBtn>
                                    </div>
                                </div>

                                <center>
                                    <MDBRow >
                                        <MDBCol size='3'><a href="/AdminReg" class="text-muted" style={{ fontSize: "13px" }}><u>New Registration</u></a></MDBCol>

                                        <MDBCol size='4'></MDBCol>


                                        <hr />
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

export default AdminLogin;