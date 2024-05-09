import React, { } from 'react';
import {
    MDBCardImage,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol
} from 'mdb-react-ui-kit';

import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';
import './APIUrl';

function About() {

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />
            <div className='bg-image' >
                <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
                <div className='mask' style={{ backgroundColor: '#292929' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>About US</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <section className="container ">
                <div className="container">
                    <MDBRow className="">
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className="border-0 shadow-0">
                                <MDBCardImage style={{ width: '105%', marginTop: '15%' }} position='top' alt='...' src='https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='5'>
                            <MDBCard className="border-0 shadow-0">
                                <MDBCardBody className="pt-5 mt-3 text-left">
                                    <br />
                                    <br />
                                    <br />
                                    <MDBCardTitle className="h3 text-dark text-uppercase">Introduction</MDBCardTitle>
                                    <MDBCardText style={{ color: 'black', textAlign: 'justify', paddingTop: '15px', }}>
                                        Welcome to Event by OSH (pvt) Ltd, where every occasion is a canvas and every detail is a brushstroke of perfection. With a blend of creativity, expertise, and unwavering dedication, we specialize in turning visions into extraordinary experiences. From the elegance of weddings to the glamour of celebrity events, we bring dreams to life with meticulous attention to detail and a passion for excellence. Join us as we embark on a journey to create unforgettable moments that will be cherished for a lifetime.
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-5 pt-5">
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='5'>
                            <MDBCard className="border-0 shadow-0">
                                <MDBCardBody className="pt-5 mt-3 text-left">
                                    <MDBCardTitle className="h3 text-dark text-uppercase">KEY FEATURES</MDBCardTitle>
                                    <MDBCardText style={{ color: 'black', textAlign: 'justify', paddingTop: '15px' }}>
                                        Experience the epitome of event perfection with Event by OSH (pvt) Ltd. Our meticulous attention to detail, personalized approach, and innovative design ensure that every occasion is a masterpiece. With a seasoned team of professionals, top-notch vendor connections, and a commitment to sustainability, we craft unforgettable experiences tailored to your vision. From weddings to celebrity soirées, we handle every aspect with precision and care, leaving you free to enjoy every moment. Welcome to a world where dreams become reality.
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className="border-0 shadow-0">
                                <MDBCardImage style={{ width: '99%' }} position='top' alt='...' src='https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mt-5 pt-5">
                        <MDBCol sm='4' className="mt-1">
                            <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{ height: '310px' }}>
                                <MDBCardTitle className="h3 text-dark text-center text-uppercase">Objectives</MDBCardTitle>
                                <hr />
                                <MDBCardText style={{ color: 'black', textAlign: 'justify' }}>
                                    Our objective at Event by OSH (pvt) Ltd is to create unforgettable experiences tailored to our clients' unique visions. Through meticulous planning, innovation, and exceptional service, we aim to exceed expectations and leave a lasting impression on all who attend our events.
                                </MDBCardText>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4' className="mt-1">
                            <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{ height: '310px' }}>
                                <MDBCardTitle className="h3 text-dark text-center text-uppercase">Vision</MDBCardTitle>
                                <hr />
                                <MDBCardText style={{ color: 'black', textAlign: 'justify' }}>

                                    Our vision at Event by OSH (pvt) Ltd is to set new standards of excellence in event planning, where each occasion is a canvas for creating unforgettable moments. With our dedication to creativity and precision, we aim to be the premier choice for those seeking exceptional experiences that leave a lasting impression.
                                </MDBCardText>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='4' className="mt-1">
                            <MDBCard className="border-0 shadow-0 alert-dark p-4" style={{ height: '310px' }}>
                                <MDBCardTitle className="h3 text-dark text-center text-uppercase">Mission</MDBCardTitle>
                                <hr />
                                <MDBCardText style={{ color: 'black', textAlign: 'justify' }}>
                                    Our mission at Event by OSH (pvt) Ltd is to deliver flawless events that surpass expectations. Through personalized service, innovative design, and meticulous attention to detail, we aim to create unforgettable experiences reflecting our commitment to excellence and client satisfaction.
                                </MDBCardText>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </div>
            </section>
            <Footer />
        </div>
    )
};

export default About;