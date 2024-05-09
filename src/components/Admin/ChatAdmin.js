import React, { useState, useEffect } from 'react';
import { MDBCard, MDBRow, MDBCol, MDBContainer, MDBTypography, } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import NumberFormat from 'react-number-format';

function ChatAdmin() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(global.APIUrl + '/user/viewAllCus')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        sessionStorage.setItem("cus_mail", 'empty');
    }, []);



    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Chat Management </h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <MDBCard className="my-5 mx-auto" style={{ maxWidth: '1400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <div className="container mt-5">
                                <MDBContainer className="p-3" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <MDBTypography tag='h6' variant='display-5' className="mb-4">
                                        Select Chat Box
                                    </MDBTypography>
                                    <MDBRow className="justify-content-between">
                                        {users.map((user, index) => (
                                            <SquareCard key={index} name={user.firstName + ' ' + user.lastName} mail={user.email} />
                                        ))}
                                    </MDBRow>
                                </MDBContainer>
                            </div>
                        </MDBCard>
                    </div>
                </div>
            </div>
        </div >
    )
};

const SquareCard = ({ name, mail }) => {
    const handleClick = () => {
        sessionStorage.setItem("cus_mail", mail);
        window.location.href = `/ChatPageAdmin`;
    };

    return (
        <MDBCol sm="auto" onClick={handleClick} style={{ width: 'calc(20% - 20px)', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', margin: '10px', cursor: 'pointer' }}>
            <MDBTypography tag='h6' className="mb-3">{name}</MDBTypography>
            <MDBTypography tag='p' className="mb-0">{mail}</MDBTypography>
        </MDBCol>
    );
};
export default ChatAdmin;
