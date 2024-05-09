import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";

function ReqEventDashboard() {

    const [evtReq, setEvtReq] = useState([]);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [expectedGuests, setExpectedGuests] = useState('');
    const [eventType, setEventType] = useState('');
    const [venueDescription, setVenueDescription] = useState('');
    const [venuePreference, setVenuePreference] = useState('');
    const [accessibilityRequirements, setAccessibilityRequirements] = useState('');
    const [staffRequired, setStaffRequired] = useState([]);
    const [estimatedBudgetRange, setEstimatedBudgetRange] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [place, setPlace] = useState([]);
    const [crew, setCrew] = useState([]);
    const [editBtn, setEditBtn] = useState(false);
    const [searchMail, setSearchMail] = useState("");


    useEffect(() => {
        getPlaces();
        getCrews();
    }, []);

    const getPlaces = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/place");
            setPlace(res.data.existingPosts);
        } catch (error) {
            console.log(error);
        }
    };
    const getCrews = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/crew");
            setCrew(res.data.existingPosts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (event) => {
        event.preventDefault();

        if (
            !eventDate ||
            !eventTime ||
            !expectedGuests ||
            !eventType ||
            !venueDescription ||
            !venuePreference ||
            !accessibilityRequirements ||
            staffRequired.length === 0 ||
            !estimatedBudgetRange
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        const reqevents = { uniqueId, email, status, eventDate, eventTime, expectedGuests, eventType, venueDescription, venuePreference, accessibilityRequirements, staffRequired, estimatedBudgetRange };
        try {
            const response = await axios.put(global.APIUrl + "/eventReq/updateEventReq", reqevents);
            Swal.fire({
                title: "Success!",
                text: "Success",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/ReqEventDashboard";
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/ReqEventDashboard";
        }
    };

    function remove(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to remove this event request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Remove'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(global.APIUrl + "/eventReq/deleteEventReq/" + id).then((res) => {
                    Swal.fire(
                        'Deleted!',
                        'Event Request has been removed.',
                        'success'
                    )
                    window.location.href = "/ReqEventDashboard";
                }).catch((err) => {
                    Swal.fire(
                        'Error!',
                        'Event Request has not been removed.',
                        'error'
                    )
                    window.location.href = "/ReqEventDashboard";
                })
            }
            else {
                window.location.href = "/ReqEventDashboard";
            }
        })
    }

    function edit(evtReq) {
        setUniqueId(evtReq.uniqueId);
        setEmail(evtReq.email);
        setEventDate(evtReq.eventDate);
        setEventTime(evtReq.eventTime);
        setExpectedGuests(evtReq.expectedGuests);
        setEventType(evtReq.eventType);
        setVenuePreference(evtReq.venuePreference);
        setVenueDescription(evtReq.venueDescription);
        setStaffRequired(evtReq.staffRequired);
        setAccessibilityRequirements(evtReq.accessibilityRequirements);
        setEstimatedBudgetRange(evtReq.estimatedBudgetRange);
        setStatus(evtReq.status);
        setEditBtn(true)
    }

    const getReq = async () => {
        try {
            const res = await axios.get(global.APIUrl + "/eventReq/allEventReq/");
            setEvtReq(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const accept = async (uniqueId, email, eventDate, eventTime, expectedGuests, eventType, venuePreference, venueDescription, staffRequired, accessibilityRequirements, estimatedBudgetRange) => {
        const status = "Accepted"
        const reqevents = { uniqueId, email, eventDate, eventTime, expectedGuests, eventType, venueDescription, venuePreference, accessibilityRequirements, staffRequired, estimatedBudgetRange, status };
        try {
            const response = await axios.put(global.APIUrl + "/eventReq/updateEventReq", reqevents);
            console.log(response.data);
            Swal.fire({
                title: "Success!",
                text: "Event Request Accepted",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            setTimeout(() => {
                window.location.href = "/ReqEventDashboard";
            }, 1000);

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Event Request Not Accepted",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/ReqEventDashboard";
        }
    }

    const getSearchMail = async () => {
        try {
            const res = await axios.get(`${global.APIUrl}/eventReq/allEventReq/${searchMail}`);
            setEvtReq(res.data);
        } catch (error) {
            console.log(error);
            return null;
        }
    };


    useEffect(() => {
        getReq()
    }, [])

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Request Event Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <MDBRow className='mt-3'>
                            <MDBCol sm='3'></MDBCol>
                            <MDBCol sm='6'>
                                {(editBtn) && (
                                    <MDBCard className='shadow-0'>
                                        <MDBCardBody className="bg-light">
                                            <center>
                                                <h4>Edit Request Event Form</h4>
                                            </center>
                                            <form onSubmit={handleEdit}>
                                                <MDBRow className="mb-3">

                                                    <MDBCol>
                                                        <TextField
                                                            label="Event Date"
                                                            type="date"
                                                            fullWidth
                                                            value={eventDate}
                                                            onChange={(e) => setEventDate(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            required
                                                            InputProps={{
                                                                inputProps: { min: new Date().toISOString().split('T')[0] }
                                                            }}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol>
                                                        <TextField
                                                            label="Event Time"
                                                            type="time"
                                                            fullWidth
                                                            value={eventTime}
                                                            onChange={(e) => setEventTime(e.target.value)}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            required
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <MDBRow className="mb-3">
                                                    <MDBCol>
                                                        <TextField
                                                            label="Expected Number of Guests"
                                                            type="number"
                                                            fullWidth
                                                            value={expectedGuests}
                                                            onChange={(e) => setExpectedGuests(e.target.value)}
                                                            required
                                                        />
                                                    </MDBCol>

                                                    <MDBCol>
                                                        <FormControl fullWidth required>
                                                            <InputLabel>Type of Event</InputLabel>
                                                            <Select
                                                                value={eventType}
                                                                onChange={(e) => setEventType(e.target.value)}
                                                            >
                                                                <MenuItem value="Celebrity Events">Celebrity Events</MenuItem>
                                                                <MenuItem value="Wedding">Wedding</MenuItem>
                                                                <MenuItem value="Parties">Parties</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                                <MDBRow className="mb-3">
                                                    <MDBCol>
                                                        <TextField
                                                            label="Venue Description"
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                            value={venueDescription}
                                                            onChange={(e) => setVenueDescription(e.target.value)}
                                                            required
                                                        />
                                                    </MDBCol>
                                                </MDBRow>

                                                <MDBRow className="mb-3">
                                                    <MDBCol>
                                                        <FormControl fullWidth required>
                                                            <InputLabel>Venue Style Preference</InputLabel>
                                                            <Select
                                                                value={venuePreference}
                                                                onChange={(e) => setVenuePreference(e.target.value)}
                                                            >
                                                                {place.map((place, index) => (
                                                                    <MenuItem key={index} value={place.name}>
                                                                        {place.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr />
                                                <MDBRow className="mb-3">
                                                    <MDBCol>
                                                        <TextField
                                                            label="Accessibility Requirements"
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                            value={accessibilityRequirements}
                                                            onChange={(e) => setAccessibilityRequirements(e.target.value)}
                                                            required
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow className="mb-3">
                                                    <MDBCol>
                                                        <FormControl fullWidth required>
                                                            <InputLabel>Types of Staff Required</InputLabel>
                                                            <Select
                                                                multiple
                                                                value={staffRequired}
                                                                onChange={(e) => setStaffRequired(e.target.value)}
                                                                renderValue={(selected) => selected.join(', ')}
                                                            >
                                                                {crew.map((crew, index) => (
                                                                    <MenuItem key={index} value={crew.name}>
                                                                        {crew.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </MDBCol>
                                                </MDBRow>
                                                <MDBRow className="mb-3">
                                                    <MDBCol>
                                                        <TextField
                                                            label="Estimated Budget Range"
                                                            fullWidth
                                                            multiline
                                                            rows={4}
                                                            value={estimatedBudgetRange}
                                                            onChange={(e) => setEstimatedBudgetRange(e.target.value)}
                                                            required
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                                <button style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }} type="submit">
                                                    Edit
                                                </button>
                                            </form>
                                            <br />

                                        </MDBCardBody>
                                    </MDBCard>
                                )}
                            </MDBCol>
                            <div className=" pt-1">
                                <h6>Search By Mail</h6>
                                <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                    setSearchMail(e.target.value);
                                }} />
                                <br />
                                <button type="button" class="btn btn-success d-letter-spacing " onClick={getSearchMail}>Go</button>
                            </div>
                            <div className="table-responsive">
                                <MDBTable borderless className='mt-3' >
                                    <MDBTableHead>
                                        <tr className="bg-dark">
                                            <th scope='col' className="text-white d-letter-spacing h6">Id</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Email</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Date</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Time</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Expected Guests</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Event Type</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Venue</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Venue Description</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Staff</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Staff Requirements</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Budget</th>
                                            <th scope='col' className="text-white d-letter-spacing h6">Status</th>
                                            <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {evtReq.map((evtReq, key) => (
                                            <tr className="bg-light" key={key}>
                                                <td>
                                                    <h6>{evtReq.uniqueId}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.email}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.eventDate}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.eventTime}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.expectedGuests}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.eventType}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.venuePreference}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.venueDescription}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.staffRequired}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.accessibilityRequirements}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.estimatedBudgetRange}</h6>
                                                </td>
                                                <td>
                                                    <h6>{evtReq.status}</h6>
                                                </td>
                                                <td className="text-center">
                                                    {evtReq.status === 'Pending' ? (
                                                        <>
                                                            <MDBBtn size='sm' className="shadow-0" color='success' type='submit' onClick={() => accept(evtReq.uniqueId, evtReq.email, evtReq.eventDate, evtReq.eventTime, evtReq.expectedGuests, evtReq.eventType, evtReq.venuePreference, evtReq.venueDescription, evtReq.staffRequired, evtReq.accessibilityRequirements, evtReq.estimatedBudgetRange)}>
                                                                <MDBIcon fas icon="check-circle" />
                                                            </MDBBtn>

                                                            <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(evtReq.uniqueId)}>
                                                                <MDBIcon fas icon="trash-alt" />
                                                            </MDBBtn>

                                                            <button size='sm' className="shadow-0" color='dark' type='submit' onClick={() => edit(evtReq)}>
                                                                <MDBIcon fas icon="edit" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <MDBBtn size='sm' className="shadow-0" color='dark' type='submit' disabled>
                                                                Disabled
                                                            </MDBBtn></>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable>
                            </div>

                        </MDBRow>
                    </div>
                </div>
            </div>
        </div >
    )
};
export default ReqEventDashboard;
