import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import axios from 'axios';
import Swal from 'sweetalert2';

function EventBudget() {
    const userName = sessionStorage.getItem('user_name');
    const [eventBudget, setEventBudget] = useState([]);

    const getBudget = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/budget/allbudgets/");
            setEventBudget(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const reject = (bid, mail, name, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, status) => {
        var status = "Rejected By C";
        const budget = { bid, name, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, status, mail };
        axios.put(global.APIUrl + "/budget/updatebudget/", budget).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Budget Rejected",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/EventBudget";
                }
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Rejected",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    const refund = (bid, mail, name, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, status) => {
        var status = "Refund Requested";
        const budget = { bid, name, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, status, mail };
        axios.put(global.APIUrl + "/budget/updatebudget/", budget).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Refund Requested",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/EventBudget";
                }
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Refund Requested",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    const pay = (bid, mail, name, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, status) => {
        const budget = { bid, mail, name, placeAbudget, placePbudget, crewAbudget, crewPbudget, promoAbudget, promoPbudget, fullBudget, status };
        localStorage.setItem('budget', JSON.stringify(budget));
        window.location.href = "/Payment"
    }

    useEffect(() => {
        getBudget();
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
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Event Budgets</p>
                    </div>
                </div>
            </div>
            <MDBCard className="my-5 mx-auto" style={{ maxWidth: '1400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <MDBTable borderless className='mt-3' >
                    <MDBTableHead>
                        <tr className="bg-dark">
                            <th scope='col' className="text-white d-letter-spacing h6">ID</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Client Mail</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Req Name</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Place Budget</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Crew Budget</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Promo Budget</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Full Budget</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Status</th>
                            <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {eventBudget.map((budget, key) => (
                            budget.mail === userName ? (
                                <tr className="bg-light">
                                    <td>
                                        <h6>
                                            {budget.bid}
                                        </h6>
                                    </td>
                                    <td>
                                        <h6>
                                            {budget.mail}
                                        </h6>
                                    </td>
                                    <td>
                                        <h6>
                                            {budget.name}
                                        </h6>
                                    </td>
                                    <td>
                                        <h6>
                                            {budget.placeAbudget + budget.placePbudget}
                                        </h6>
                                    </td>
                                    <td>
                                        <h6>
                                            {budget.crewAbudget + budget.crewPbudget}
                                        </h6>
                                    </td>
                                    <td>
                                        <h6>
                                            {budget.promoAbudget + budget.promoPbudget}
                                        </h6>
                                    </td>
                                    <td>
                                        <h6>
                                            {budget.fullBudget}
                                        </h6>
                                    </td>
                                    <td>
                                        <h6>
                                            {budget.status}
                                        </h6>
                                    </td>
                                    <td className="text-center">
                                        <div className='col'>
                                            {((budget.status === 'Process')) && (
                                                <>
                                                    <div className='row'>
                                                        <MDBBtn size='sm' className="shadow-0" color='danger' type='submit' onClick={() => reject(budget.bid, budget.mail, budget.name, budget.placeAbudget, budget.placePbudget, budget.crewAbudget, budget.crewPbudget, budget.promoAbudget, budget.promoPbudget, budget.fullBudget, budget.status)}>
                                                            Reject
                                                        </MDBBtn>
                                                    </div>
                                                    <br />
                                                    <div className='row'>
                                                        <MDBBtn size='sm' className="shadow-0" color='success' type='submit' onClick={() => pay(budget.bid, budget.mail, budget.name, budget.placeAbudget, budget.placePbudget, budget.crewAbudget, budget.crewPbudget, budget.promoAbudget, budget.promoPbudget, budget.fullBudget, budget.status)}>
                                                            Pay Now
                                                        </MDBBtn>
                                                    </div>
                                                </>

                                            )}
                                            {((budget.status === 'Paid')) && (
                                                <div className='row'>
                                                    <MDBBtn size='sm' className="shadow-0" color='danger' type='submit' onClick={() => refund(budget.bid, budget.mail, budget.name, budget.placeAbudget, budget.placePbudget, budget.crewAbudget, budget.crewPbudget, budget.promoAbudget, budget.promoPbudget, budget.fullBudget, budget.status)}>
                                                        Refund
                                                    </MDBBtn>
                                                </div>
                                            )}

                                            {((budget.status === 'Refund Requested') || (budget.status === 'Rejected') || (budget.status === 'Rejected By C')) && (

                                                <div className='row'>
                                                    <MDBBtn size='sm' className="shadow-0" color='dark' type='submit' disabled>
                                                        Disabled
                                                    </MDBBtn>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <div key={key}></div>
                            )
                        ))}
                    </MDBTableBody>
                </MDBTable>
            </MDBCard>
            <Footer />
        </div>
    );
}

export default EventBudget;
