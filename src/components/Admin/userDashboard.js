import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import NumberFormat from 'react-number-format';
import * as XLSX from 'xlsx';


function UserDashboard() {

    const [admin, setAdmin] = useState([]);
    const [submit, setSubmit] = useState(true);
    const [userName, setUserName] = useState("")
    const [userType, setUserType] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [search, setSearch] = useState("")

    const valid = () => {
        if ((userName != "") && (phone != "") && (email != "")) {
            setSubmit(false)
        }
        else {
            setSubmit(true)
        }
    }

    async function edited(e) {
        e.preventDefault();
        const employee = { userName, phone, email, userType, password };
        try {
            const response = await axios.put(global.APIUrl + "/user/updateadmin", employee);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Edited",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/UserDashboard";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Not Edited",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/UserDashboard";
        }
    }

    const getAdmins = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/user/viewAllSystemReg/");
            setAdmin(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getByTypeAdmin = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/user/viewSystemReg/" + search);
            setAdmin(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function remove(email) {
        axios.delete(global.APIUrl + "/user/deleteadmin/" + email).then(() => {
            window.location.href = "/UserDashboard";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    function edit(userName, email, password, phone, userType) {
        setUserName(userName)
        setEmail(email)
        setPassword(password)
        setPhone(phone)
        setUserType(userType)
    }

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(admin);
        XLSX.utils.book_append_sheet(wb, ws, "User Data");
        XLSX.writeFile(wb, "user.xlsx");
    }

    useEffect(() => {
        getAdmins()
        valid()
    }, [userName, email, password, phone, userType])

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >

                        <MDBRow className='mt-3'>

                            <MDBCol sm='3'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            <h4>Admin Form</h4>
                                        </center>
                                        <form>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Name</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setUserName(e.target.value);
                                                    }} value={userName} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Email</label>
                                                <input type="email" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }} value={email} required disabled />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Phone Number</label>
                                                <NumberFormat format="0## ### ####" class="form-control" placeholder="0## ### ## ##" style={{ fontSize: "18px" }} onChange={(e) => {
                                                    setPhone(e.target.value);
                                                }} value={phone} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label h6">Role</label>
                                                <input type="text" class="form-control" placeholder=""
                                                    onChange={(e) => {
                                                        setUserType(e.target.value);
                                                    }} value={userType} disabled />
                                            </div>

                                            <div className="text-end">
                                                <button type="button" class="btn btn-success d-letter-spacing " onClick={edited} disabled={submit} >Edit</button>
                                                &nbsp;&nbsp;&nbsp;
                                                <a href="../Admin">
                                                    <MDBBtn className='btn-sm' outline style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '2px' }} color='dark'>
                                                        Back
                                                    </MDBBtn>
                                                </a>
                                            </div>
                                        </form>
                                        <br />

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <div className=" pt-1">
                                <h6>Search Type</h6>
                                <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                                <br />
                                <button type="button" class="btn btn-success d-letter-spacing " onClick={getByTypeAdmin}>Go</button>
                            </div>
                            <button onClick={exportToExcel} className="btn btn-dark" style={{width: 10, marginLeft:1060}}>
                                <i class="fa-solid fa-file-arrow-down"></i>
                            </button>
                            <MDBTable borderless className='mt-3' >
                                <MDBTableHead>
                                    <tr className="bg-dark">
                                        <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Email</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Phone Number</th>
                                        <th scope='col' className="text-white d-letter-spacing h6">Admin Role</th>
                                        <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {admin.map((admin, key) => (
                                        <tr className="bg-light">
                                            <td>
                                                <h6>
                                                    {admin.userName}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {admin.email}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {admin.phone}
                                                </h6>
                                            </td>
                                            <td>
                                                <h6>
                                                    {admin.userType}
                                                </h6>
                                            </td>
                                            <td className="text-center">
                                                <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(admin.email)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(admin.userName, admin.email, admin.password, admin.phone, admin.userType)}><MDBIcon fas icon="edit" /></button>{''}&nbsp;&nbsp;
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};
export default UserDashboard;
