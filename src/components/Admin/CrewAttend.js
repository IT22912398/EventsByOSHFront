import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import * as XLSX from 'xlsx';

function CrewAttend() {
    const [attend, setAttend] = useState([]);
    const [submit, setSubmit] = useState(true);
    const [crewID, setCrewID] = useState("");
    const [date, setDate] = useState("");
    const [eventName, setEventName] = useState("");
    const [crewIDError, setCrewIDError] = useState(""); // State for crewID error message
    const [dateError, setDateError] = useState(""); // State for date error message
    const [eventNameError, setEventNameError] = useState(""); // State for eventName error message

    const valid = () => {
        let isValid = true;

        // Validate crewID
        if (crewID.trim() === "") {
            setCrewIDError("Crew ID is required");
            isValid = false;
        } else {
            setCrewIDError("");
        }

        // Validate date
        if (date.trim() === "") {
            setDateError("Date is required");
            isValid = false;
        } else {
            setDateError("");
        }

        // Validate eventName
        if (eventName.trim() === "") {
            setEventNameError("Event Name is required");
            isValid = false;
        } else {
            setEventNameError("");
        }

        setSubmit(!isValid); // Disable submission if isValid is false
    };

    async function submited(e) {
        e.preventDefault();
        const attendance = { crewID, date, eventName };
        try {
            const response = await axios.post(global.APIUrl + "/attend/add", attendance);
            Swal.fire({
                title: "Success!",
                text: "Attendance Added Successfully!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/CrewAttend";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Attendance Not Added Successfully!",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
            window.location.href = "/CrewAttend";
        }
    }

    const getAttend = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/attend/get/");
            setAttend(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const exportToExcel = () => {
        const switchedAttendData = attend.map(entry => ({
            eventName: entry.eventName,
            crewID: entry.crewID,
            date: entry.date
            
        }));
        const ws = XLSX.utils.json_to_sheet(switchedAttendData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Attendance Data");
        XLSX.writeFile(wb, "attendance.xlsx");
    };

    useEffect(() => {
        getAttend();
        valid();
    }, [crewID, date, eventName]);

    return (
        <div className="dashboard-main-wrapper">
            <Navbar />
            <div className="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i className="fas fa-home"></i> Crew Attended Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }}>
                        <MDBRow className='mt-3'>
                            <MDBCol sm='3'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody className="bg-light">
                                        <center>
                                            <h4>Attendance Form</h4>
                                        </center>
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="eventNameInput" className="form-label h6">Event Name</label>
                                                <input type="text" className="form-control" id="eventNameInput" placeholder=""
                                                    onChange={(e) => { setEventName(e.target.value); valid(); }} value={eventName} />
                                                {eventNameError && <p className="text-danger">{eventNameError}</p>} {/* Display eventName error message */}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="crewIdInput" className="form-label h6">Crew Id</label>
                                                <input type="text" className="form-control" id="crewIdInput" placeholder=""
                                                    onChange={(e) => { setCrewID(e.target.value); valid(); }} value={crewID} />
                                                {crewIDError && <p className="text-danger">{crewIDError}</p>} {/* Display crewID error message */}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="dateInput" className="form-label h6">Attended Date</label>
                                                <input type="date" className="form-control" id="dateInput" placeholder=""
                                                    onChange={(e) => { setDate(e.target.value); valid(); }} value={date} />
                                                {dateError && <p className="text-danger">{dateError}</p>} {/* Display date error message */}
                                            </div>
                                            
                                            <div className="text-end">
                                                <button type="button" className="btn btn-success d-letter-spacing" onClick={submited} disabled={submit}>Save</button>
                                            </div>
                                        </form>
                                        <br />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <button onClick={exportToExcel} className="btn btn-dark" style={{ width: 10, marginLeft: 1060 }}>
                                <i className="fa-solid fa-file-arrow-down"></i>
                            </button>
                            <MDBTable borderless className='mt-3'>
                                <MDBTableHead>
                                    <tr className="bg-warning">
                                        <th scope='col' className="text-yellow d-letter-spacing h6">Crew Id</th> {/* Changed text color to light yellow */}
                                        <th scope='col' className="text-yellow d-letter-spacing h6">Date</th> {/* Changed text color to light yellow */}
                                        <th scope='col' className="text-yellow d-letter-spacing h6">Event Name</th> {/* Changed text color to light yellow */}
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {attend.map((attendance, key) => (
                                        <tr className="bg-light" key={key}>
                                            <td>
                                                <h6>{attendance.crewID}</h6>
                                            </td>
                                            <td>
                                                <h6>{attendance.date}</h6>
                                            </td>
                                            <td>
                                                <h6>{attendance.eventName}</h6>
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrewAttend;
