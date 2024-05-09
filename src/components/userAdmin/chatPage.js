import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBTypography, MDBInput } from 'mdb-react-ui-kit';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import axios from 'axios';
import Swal from 'sweetalert2';

function ChatPage() {    
    const [messages, setMessages] = useState([]);
    const [message, setNewMessage] = useState("");
    const [submit, setSubmit] = useState(true);
    const email = sessionStorage.getItem("user_name");
    const conmail = sessionStorage.getItem("con_mail");
    const key = email + conmail

    useEffect(() => {
        fetchMessages();
        valid();
    }, [message]);

    const valid = () => {
        if ((message !== "")) {
            setSubmit(false);
        } else {
            setSubmit(true);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/chat/allchat');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleMessageSend = async () => {
        const chat = { email, message, key };
        try {
            await axios.post(global.APIUrl + '/chat/addchat', chat);
            window.location.href = "/ChatPage";
        } catch (error) {
            console.error('Error sending message:', error);
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
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Chat with Request Manager</p>
                    </div>
                </div>
            </div>
            <MDBCard className="my-5 mx-auto" style={{ maxWidth: '1400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="container mt-5">
            <MDBContainer className="p-3" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <MDBCard>
                    <MDBCardBody>
                        <MDBTypography variant="h5" className="fw-bold">Chat Box</MDBTypography>
                        <div className="chat-card" style={{ maxHeight: '350px', overflowY: 'scroll', border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#f9f9f9', marginTop: '15px' }}>
                            <MDBListGroup>
                                {messages.map(message => (
                                    (message.key === key) && (
                                        <MDBListGroupItem key={message.id}>
                                            <MDBTypography variant="body1" className="fw-bold">{message.email} :</MDBTypography>
                                            <MDBTypography variant="body1">{message.message}</MDBTypography>
                                        </MDBListGroupItem>
                                    )
                                ))}
                            </MDBListGroup>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                            <MDBInput
                                variant="outlined"
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={e => setNewMessage(e.target.value)}
                                className="message-input"
                                style={{ flex: '1' }}
                            />
                            <MDBBtn color="success" style={{ marginLeft: '10px' }} onClick={handleMessageSend} disabled={submit}>Send</MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
            </MDBCard>
            <Footer />
        </div>
    );
}

export default ChatPage;
