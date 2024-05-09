import React, { Component } from "react";
import Swal from 'sweetalert2';
import {
    MDBIcon, MDBCardImage,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn, MDBNavbarItem, MDBNavbarLink
} from 'mdb-react-ui-kit';

class Navbar extends Component {
    render() {
        function logout() {

            Swal.fire({
                title: "Success!",
                text: "Logout Success",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/AdminLogin";
                }
            });
        }
        return (
            <div>
                <div class="dashboard-header">
                    <nav class="navbar navbar-expand-lg bgTopNav fixed-top">
                        <a class="navbar-brand h1 fw-bold" style={{ fontSize: '25px' }} href="Admin">
                            <span className="text-success">&nbsp;Event</span><span className="text-dark">-By OSH</span>
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse " id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto navbar-right-top">
                                <li class="nav-item square border border-0">
                                    <MDBNavbarItem style={{ paddingRight: "30px", }}>
                                        <MDBNavbarLink className="text-success" style={{ cursor: 'pointer', fontWeight: 'bold', }} active aria-current='page' onClick={logout}>
                                            Logout
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div >

                <div class="nav-left-sidebar sidebar-dark">
                    <div class="menu-list" style={{ paddingBottom: '40%' }}>
                        <nav class="navbar navbar-expand-lg navbar-light shadow-0">
                            <a class="d-xl-none d-lg-none" href="#">Dashboard</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav flex-column">
                                    <h4 className="mt-4 mb-4 text-warning">&nbsp;&nbsp;&nbsp;Admin Dashboard</h4>
                                    <li class="nav-item">
                                        <a class="nav-link" href="ReqEventDashboard" style={{ fontSize: '17px' }} aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"> Req Event Management </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="FinanceDashboard" style={{ fontSize: '17px' }} aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"> Finance Management </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="Paymentdashboard" style={{ fontSize: '17px' }} aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"> Payment Management </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="Feedbackdashboard" style={{ fontSize: '17px' }} aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"> FeedBack Management </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link " style={{ fontSize: '17px' }} href="UserDashboard" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"> User/Staff Management </a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link " style={{ fontSize: '17px' }} href="CrewDash" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">Crew Management</a>
                                    </li>
                                     <li class="nav-item ">
                                        <a class="nav-link " style={{ fontSize: '17px' }} href="CrewAttend" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">Crew Attend Management</a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link " style={{ fontSize: '17px' }} href="PlaceDash" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">Place Management</a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link " style={{ fontSize: '17px' }} href="SponsorDash" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">Sponsor Management</a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link " style={{ fontSize: '17px' }} href="ChatAdmin" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">Chat Management For Req Manager</a>
                                    </li>
                                    <li class="nav-item ">
                                        <a class="nav-link " style={{ fontSize: '17px' }} href="ChatSponsor" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">Chat Management For Sponsor</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div >
        );
    }
}
export default Navbar; 