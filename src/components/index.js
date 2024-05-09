import React, { } from 'react';
import {
    MDBCardImage,
    MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';

function Home() {

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />
            <header class="py-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div class="container px-5">
                    <div class="row gx-5 align-items-center justify-content-center">
                        <div class="col-lg-8 col-xl-7 col-xxl-6">
                            <div className='row'>
                                <div className='col'>
                                    <div class="my-5 text-center text-xl-start">
                                        <h1 class="display-5 fw-bolder text-white mb-2 text-uppercase">
                                            Our Services<br />
                                            <span
                                                class="txt-rotate text-warning"
                                                data-period="2000"
                                                data-rotate='[ "Festivals", "Musical Shows", "Weddings", "Charity Events"]'></span>
                                        </h1>
                                        <p class="text-white" style={{ fontSize: '20px', fontWeight: 'bold', }}>Welcome to Event by OSH (pvt) Ltd, where dreams become reality. As a premier private event planning company, we specialize in crafting unforgettable weddings, parties, and celebrity events. With meticulous attention to detail and a passion for perfection, we are dedicated to making your dream event come true. Let us turn your vision into an extraordinary experience that you and your guests will cherish forever.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="container mt-5 pt-5 pb-5 mb-5">
                <hr />
                <br />
                <br />
                <div className="container">
                    <MDBRow className="mt-4">
                        <MDBCol >
                            <div class="my-5 text-center text-xl-start">
                                <h2 class=" fw-bolder text-black mb-2 text-uppercase">
                                    Visit Event by OSH
                                    <br />
                                    <br />
                                </h2>
                                <p class="text-black" style={{ fontSize: '18px', fontWeight: 'bold', }}>
                                    In the realm of Event by OSH (pvt) Ltd, dreams unfold into breathtaking realities. We are artisans of elegance, orchestrating extraordinary moments that transcend the ordinary. From intimate weddings to grand galas, our team infuses each event with creativity and precision, ensuring every detail is a masterpiece. With passion as our guide, we curate experiences that linger in the heart long after the final toast. At Event by OSH, we don't just plan events; we craft stories—stories of enchantment, elegance, and everlasting memories.</p>
                            </div>
                        </MDBCol>
                        <MDBCol >
                            <div >
                                <MDBCardImage src='https://images.pexels.com/photos/2263435/pexels-photo-2263435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='...' height="
                                400" width="650" />
                            </div>
                        </MDBCol>
                    </MDBRow>
                </div>
                <hr />
            </section>

            <section className="container mt-5 pt-5 pb-5 mb-5">
                <h2 className="text-uppercase text-center" style={{ color: '#19011C' }}>Service by brand</h2>
                <div className="container">
                    <MDBRow className="mt-4">
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLi21exEMjpR4Yi91YfpL5e6fqZ2LuTz8cCD0G9HyHwQ&s' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://yt3.googleusercontent.com/AREBoT-16kBqpKMCOTDRK-Fi9In_uHtrGQg1I5xVHDgE1YYzmkl_s1dYMDMDij-3HDV5gxNgjA=s900-c-k-c0x00ffffff-no-rj' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='data:image/jpeg;base64,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r64nRwb0k8RtLanb06VLlUgUUvScnbJOTqAyMN9RlRe9VnFQgip6rYI0kadORqznbGQeu/nt2PxUEEBMAqyjcZ73M6nGSPnBt02kewxVXKTzy7S5N6XuKHYLRBxq2pMSBjVndjtjeafB/SRxG2WppCVGrVDcu9WmzMzMgGdmAC6aYwAMALKvR4gqMHCEvpRCGPdwgUbY330fbMhxbAwF9XAUnBwBSangjGCMtq+J84WDGlXKhzS7SbPbu9W/PESlMV2TkYKMKekKuwGrOcaT18Zl2g9I97drSD8um1CoK6PRVkdXAI6ljtvK/c8QV1KaCBnWDqJOs6ic56jL+/ujeRkn2ULTrYjmZ6ZZ+me/RAr0reowGNRV1YnzYKwX6gJWO1fbO74iV+UOBTTdadMaaYPTOMkk+0k9TK1ERw44O4rUlybVM9Drel3iDUzTK2+llNM/NtnBGk/T64ml2d9Jl9ZWyW1IUTSp6tPMRmbvMWIyGHixlJiR7DHVcqHPLtJDjPEWua9S4dVWpWY1GCDSuo9SBk9Tk+8mR8ROqVFRERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA//9k=' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://pbs.twimg.com/profile_images/1325864798693830656/lreWi4kb_400x400.jpg' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStuVdzcdP9T4zkuaywJrOo4PDLooaWHCnmvg&usqp=CAU' alt='...' />
                            </div>
                        </MDBCol>
                        <MDBCol sm='2'>
                            <div className="shopBox">
                                <MDBCardImage position='top' src='https://seeklogo.com/images/B/bookmyshow-logo-31BC3C7354-seeklogo.com.png' alt='...' />
                            </div>
                        </MDBCol>
                    </MDBRow>

                </div>
            </section>
            <section className="container" style={{ marginTop: '10%', marginBottom: '8%' }}>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card border-0 shadow-0">
                            <h3 style={{ lineHeight: '0px' }} className="mb-0 pb-4">Our Location</h3>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.194046863206!2d79.9729445!3d6.9146775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c63e344ab9a7536!2sSri%20Lanka%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2slk!4v1631374842039!5m2!1sen!2slk" width="700" height="500" style={{ border: '0' }} allowfullscreen="" loading="lazy"></iframe>
                            <p class="text-muted pt-3 text-left">SLIIT Malabe Campus, New Kandy Rd, Malabe 10115</p>
                        </div>
                    </div>
                    <div class="col-sm-1"></div>
                    <div class="col-sm-5">
                        <div class="card border-0 shadow-0 bg-light p-5">
                            <h3 style={{ lineHeight: '0px' }} className="mb-0 pb-0 text-success">Openning Time</h3>
                            <div className="ms-3 pt-5">
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Monday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Tuesday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Wednesday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Thursday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Friday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 10.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Saturday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 08.00 P.M.</h5>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-dark">Sunday : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5>10.00 AM. - 08.00 P.M.</h5>
                                    </div>
                                </div>
                                <hr />
                                <div class="mb-3 row">
                                    <div class="col-sm-4">
                                        <h5 className="text-muted">Holidays : </h5>
                                    </div>
                                    <div class="col-sm-8">
                                        <h5 className="text-muted">New Year Week / Poyaday</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <Footer />
        </div>
    )
};

export default Home;