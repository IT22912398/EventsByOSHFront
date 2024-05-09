import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBTypography, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
import NumberFormat from 'react-number-format';

function ChatPageAdmin() {

    const [messages, setMessages] = useState([]);
    const [message, setNewMessage] = useState("");
    const [submit, setSubmit] = useState(true);
    const email = sessionStorage.getItem("cus_mail");
    const conmail = sessionStorage.getItem("admin_name");
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
        var email = sessionStorage.getItem("admin_name");
        const chat = { email, message, key };
        try {
            await axios.post(global.APIUrl + '/chat/addchat', chat);
            window.location.href = "/ChatPageAdmin";
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div class="dashboard-main-wrapper" >
            <Navbar />
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Chat Box </h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
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
                </div>
            </div>
        </div >
    )
};

export default ChatPageAdmin;
