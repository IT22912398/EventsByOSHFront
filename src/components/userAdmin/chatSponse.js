import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBTypography, MDBListGroup, MDBListGroupItem, MDBAvatar, MDBBtn } from 'mdb-react-ui-kit';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import axios from 'axios';
import Swal from 'sweetalert2';

function ChatSponse() {

    const [reqManager, setReqManager] = useState([]);

    useEffect(() => {
        axios.get(global.APIUrl + '/user/viewAllSystemReg')
            .then(res => {                
                setReqManager(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        sessionStorage.setItem("con_mail", 'empty');
    }, []);

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />
            <div className='bg-image'>
                <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
                <div className='mask' style={{ backgroundColor: '#292929' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Chat with Sponsor Manager</p>
                    </div>
                </div>
            </div>
            <MDBCard className="my-5 mx-auto" style={{ maxWidth: '1400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="container mt-5">
                    <MDBContainer className="p-3" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <MDBTypography tag='h6' variant='display-5' className="mb-4">
                           Select Chat Box
                        </MDBTypography>
                        <MDBRow className="justify-content-between">
                            {reqManager.map((user, index) => (
                                (user.userType === "Sponsor Manager") && (<SquareCard key={index} name={user.userName} mail={user.email} />)
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </div>
            </MDBCard>
            <Footer />
        </div>
    );
}

const SquareCard = ({ name, mail }) => {
    const handleClick = () => {
        sessionStorage.setItem("con_mail", mail);
        window.location.href = `/ChatPage`;
    };

    return (
        <MDBCol sm="auto" onClick={handleClick} style={{ width: 'calc(20% - 20px)', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', margin: '10px', cursor: 'pointer' }}>
            <MDBTypography tag='h6' className="mb-3">{name}</MDBTypography>
            <MDBTypography tag='p' className="mb-0">{mail}</MDBTypography>
        </MDBCol>
    );
};

export default ChatSponse;
