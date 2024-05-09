
import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';

function NavBar() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);

    function logout() {
        sessionStorage.removeItem('user_name');
        Swal.fire({
            title: "Success!",
            text: "Logout Success",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"
        }).then(okay => {
            if (okay) {
                window.location.href = "/UserLogin";
            }
        });
    }


    useEffect(() => {
        const tel = sessionStorage.getItem('user_name');
        if (tel === null) {
            Swal.fire({
                title: "Error!",
                text: "To access web site, First of all you must fill login form.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/UserLogin";
                }
            });
        }
    })

    return (
        <MDBNavbar expand='lg' className="sticky-top" light bgColor='dark'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/' style={{ fontSize: '25px' }} className="pt-2 navbar-brand h1 fw-bold">
                    <span className="text-success">&nbsp;Event</span><span className="text-white">-By OSH</span>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='userAdminDashboard' tabIndex={-1} aria-disabled='true' style={{ color: '#DCDCDC', cursor: 'pointer' }}>
                                Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='RequestEvent' tabIndex={-1} aria-disabled='true' style={{ color: '#DCDCDC', cursor: 'pointer' }}>
                                Request Event
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='EventBudget' tabIndex={-1} aria-disabled='true' style={{ color: '#DCDCDC', cursor: 'pointer' }}>
                                Events Budget
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='Feedback' tabIndex={-1} aria-disabled='true' style={{ color: '#DCDCDC', cursor: 'pointer' }}>
                                FeedBack
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/crew' tabIndex={-1} aria-disabled='true' style={{ color: '#DCDCDC', cursor: 'pointer' }}>
                                Our Crew
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/venue' tabIndex={-1} aria-disabled='true' style={{ color: '#DCDCDC', cursor: 'pointer' }}>
                                Our Venues
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='Chat' tabIndex={-1} aria-disabled='true' style={{ color: '#DCDCDC', cursor: 'pointer' }}>
                                Chat With Req Manager
                            </MDBNavbarLink>
                        </MDBNavbarItem> 
                        <MDBNavbarItem>
                            <MDBNavbarLink href='ChatSponse' tabIndex={-1} aria-disabled='true' style={{ color: '#DCDCDC', cursor: 'pointer' }}>
                                Chat With Sponse Manager
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>

                    <MDBCollapse navbar show={showNavRight}>
                        <MDBCollapse navbar show={showNavRight}>
                            <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                                <MDBNavbarItem>
                                    <MDBNavbarLink style={{ color: '#DCDCDC', cursor: 'pointer' }} active aria-current='page' onClick={logout}>
                                        Logout
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink style={{ color: '#DCDCDC', cursor: 'pointer' }} active aria-current='page' href="UserProfile">
                                        Profile
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBCollapse>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
};

export default NavBar;