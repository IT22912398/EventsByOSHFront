
import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import * as XLSX from 'xlsx';



function Paymentdashboard() {

    const [payment, setPayment] = useState([])    
    const [searchMail, setSearchMail] = useState("");

    const getPayments = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/payment/allpayment/");
            setPayment(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    async function reject(paymentID, budID, cost, email, status, date) {
        axios.put(global.APIUrl + "/payment/updatepayment", {
            paymentID: paymentID,
            budID: budID,
            cost: cost,
            email: email,
            status: "Rejected",
            date: date
        }).then(() => {
            window.location.href = "/Paymentdashboard";
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Payment Not Reject",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function remove(code) {
        axios.delete(global.APIUrl + "/payment/deletepayment/" + code).then(() => {
            window.location.href = "/Paymentdashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Payment Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }
    
    const getSearchMail = async () => {
        try {
            const res = await axios.get(`${global.APIUrl}/payment/allpayment/${searchMail}`);
            setPayment(res.data);
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(payment);
        XLSX.utils.book_append_sheet(wb, ws, "Payment Data");
        XLSX.writeFile(wb, "payment.xlsx");
    };

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <div class="dashboard-main-wrapper">
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '4%', paddingLeft: '2%', width: '98%' }}>
                    <br />

                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Payment Management Dashboard</h4>
                    <hr />

                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <div className="text-end mt-5">
                        </div>

                        <div className=" pt-1 mt-5">
                            <h6>Search Client Email</h6>
                            <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                setSearchMail(e.target.value);
                            }} />
                            <br />
                            <button type="button" class="btn btn-success d-letter-spacing " onClick={getSearchMail} >Go</button>
                            <button onClick={exportToExcel} className="btn btn-dark" style={{width: 10, marginLeft:1060}}>
                                <i class="fa-solid fa-file-arrow-down"></i>
                            </button>
                        </div>           

                        <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>Accepted  Payments</u></h4>

                        <MDBTable className="mt-2" hover>
                            <MDBTableHead className="bg-dark">
                                <tr>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>ID</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>Budget ID</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Price</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Email</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Status</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Date</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Reject</h6></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>

                                {payment.map((payment, key) => (
                                    payment.status === 'Paid' ? (
                                        <tr className="bg-light" key={key}>
                                            <td style={{ fontSize: '17px' }}>{payment.paymentID}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.budID}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.cost} Rs/=</td>
                                            <td style={{ fontSize: '17px' }}>{payment.email}</td>
                                            <td style={{ fontSize: '17px', fontWeight: 'bold', }}>{payment.status}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.date}</td>
                                            <td>
                                                <MDBBtn size='lg' className="shadow-0" outline color="danger" onClick={() => reject(payment.paymentID, payment.budID, payment.cost, payment.email, payment.status, payment.date)}>Reject</MDBBtn>
                                            </td>
                                        </tr>
                                    ) : (
                                        <div key={key}></div>
                                    )
                                ))}
                            </MDBTableBody>
                        </MDBTable>

                        <h4 className='mt-5' id="#current" style={{ color: "#606060FF", paddingBottom: "1%" }}><u>Rejected Payments</u></h4>

                        <MDBTable className="mt-2" hover>
                            <MDBTableHead className="bg-dark" >
                                <tr>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>ID</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '300', letterSpacing: '2px', fontSize: '18px' }}>Budget ID</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Price</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Email</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Status</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Date</h6></th>
                                    <th scope='col' ><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px', fontSize: '18px' }}>Delete</h6></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {payment.map((payment, key) => (
                                    payment.status === 'Rejected' ? (
                                        <tr className="bg-light" key={key}>
                                            <td style={{ fontSize: '17px' }}>{payment.paymentID}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.budID}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.cost} Rs/=</td>
                                            <td style={{ fontSize: '17px' }}>{payment.email}</td>
                                            <td style={{ fontSize: '17px', fontWeight: 'bold', }}>{payment.status}</td>
                                            <td style={{ fontSize: '17px' }}>{payment.date}</td>
                                            <td>
                                                <MDBBtn size='lg' className="shadow-0" outline color="danger" onClick={() => remove(payment.paymentID)}>Delete</MDBBtn>
                                            </td>
                                        </tr>
                                    ) : (
                                        <div key={key}></div>
                                    )
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Paymentdashboard
