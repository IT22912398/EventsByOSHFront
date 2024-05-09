import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import axios from 'axios';
import Swal from 'sweetalert2';

function RequestEvent() {
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [expectedGuests, setExpectedGuests] = useState('');
    const [eventType, setEventType] = useState('');
    const [venueDescription, setVenueDescription] = useState('');
    const [venuePreference, setVenuePreference] = useState('');
    const [accessibilityRequirements, setAccessibilityRequirements] = useState('');
    const [staffRequired, setStaffRequired] = useState([]);
    const [estimatedBudgetRange, setEstimatedBudgetRange] = useState('');
    const uniqueId = "A" + generateId();
    const email = sessionStorage.getItem('user_name');
    const [place, setPlace] = useState([]);
    const [crew, setCrew] = useState([]);

    useEffect(() => {
        getPlaces();
        getCrews();
    }, []);

    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

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

    const handleSubmit = async (event) => {
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

        const reqevents = { uniqueId, email, eventDate, eventTime, expectedGuests, eventType, venueDescription, venuePreference, accessibilityRequirements, staffRequired, estimatedBudgetRange };
        try {
            const response = await axios.post(global.APIUrl + "/eventReq/addEventReq", reqevents);
            Swal.fire({
                title: "Success!",
                text: "Success",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/RequestEvent";
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Not Added",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
            window.location.href = "/RequestEvent";
        }
    };

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
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Make Your Request</p>
                    </div>
                </div>
            </div>
            <MDBCard className="my-5 mx-auto" style={{ maxWidth: '800px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <MDBCardBody>
                    <form onSubmit={handleSubmit}>
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
                            Submit
                        </button>
                    </form>
                </MDBCardBody>
            </MDBCard>
            <Footer />
        </div>
    );
}

export default RequestEvent;
