import React, { useState, useEffect } from 'react';
import { MDBIcon, MDBBtn, MDBCol, MDBCard, MDBCardImage, MDBRow, MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from './main_parts/navbar.user.log.js';
import Footer from './main_parts/footer.js';
import './APIUrl';

function UserLogin() {

    const userName = sessionStorage.getItem('user_name');
    const [profile, setProfile] = useState([]);

    const getProfile = async (e) => {
        try {
            const res = await axios.get(global.APIUrl + "/user/viewUserProfie/" + userName);
            setProfile(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function remove() {
        axios.delete(global.APIUrl + "/user/deleteuser/" + userName).then(() => {
            Swal.fire({
                title: "Error!",
                text: "Profile Deleted",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);


        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Profile Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>                    
                </center>
            </div>
            <Navbar />
            <MDBRow style={{ marginTop: '7%', marginBottom: '10%', width: '99%' }}>
                <section class="vh-100" style={{ backgroundColor: '#eee' }}>
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-md-12 col-xl-4">
                                {profile.map((profile, key) => (
                                    <div class="card" style={{ borderRadius: '15px' }}>
                                        <div class="card-body text-center">
                                            <div class="mt-3 mb-4">
                                                <img src="https://static.vecteezy.com/system/resources/thumbnails/020/911/732/small/profile-icon-avatar-icon-user-icon-person-icon-free-png.png"
                                                    class="rounded-circle img-fluid" style={{ width: '100px' }} />
                                            </div>
                                            <h4 class="mb-2">{profile.firstName} {" "} {profile.lastName}</h4>
                                            <p class="text-muted mb-4">Email : {profile.email}</p>
                                            <div class="mb-4 pb-2">
                                                <button type="button" class="btn btn-outline-primary btn-floating">
                                                    <i class="fab fa-facebook-f fa-lg"></i>
                                                </button>
                                                <button type="button" class="btn btn-outline-primary btn-floating">
                                                    <i class="fab fa-twitter fa-lg"></i>
                                                </button>
                                                <button type="button" class="btn btn-outline-primary btn-floating">
                                                    <i class="fab fa-skype fa-lg"></i>
                                                </button>
                                            </div>
                                            <button type="button" class="btn btn-primary btn-rounded btn-lg" onClick={remove}>
                                                Delete Profile
                                            </button>
                                            <div class="d-flex justify-content-between text-center mt-5 mb-2">
                                                <div>
                                                    <p class="mb-2 h5">8471</p>
                                                    <p class="text-muted mb-0">Wallets Balance</p>
                                                </div>
                                                <div class="px-3">
                                                    <p class="mb-2 h5">8512</p>
                                                    <p class="text-muted mb-0">Income amounts</p>
                                                </div>
                                                <div>
                                                    <p class="mb-2 h5">4751</p>
                                                    <p class="text-muted mb-0">Total Transactions</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </section>
            </MDBRow>
            <Footer />
        </div>
    )
};

export default UserLogin;