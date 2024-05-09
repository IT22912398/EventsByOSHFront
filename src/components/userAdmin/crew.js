import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBAvatar,
  MDBBtn,
} from "mdb-react-ui-kit";
import Navbar from "../main_parts/navbar.user.log.js";
import Footer from "../main_parts/footer.js";
import axios from "axios";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";

function Crew() {
  const [data, setData] = useState();
  const [eventDate, setEventDate] = useState();
  const [crewName, setCrewName] = useState();

  useEffect(() => {
    //get server side http module to get data to client side Http request
    axios.get(global.APIUrl+"/crew").then((res) => {
      if (res.data.success) {
        setData(res.data.existingPosts);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      eventDate,
      crewName
    }

    axios.post(global.APIUrl+"/eventReq/availability",data).then((res) => {
      if(res.data.status === 'Date is Booked Already'){
         Swal.fire({
          title: res.data.status,
          text: "Booked Already",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"
      });
      }else{
        Swal.fire({
          title: res.data.status,
          text: "You can make a Booking",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"
      });
      }
    })
  };

  return (
    <div>
      <div className="pt-1 pb-1" style={{ backgroundColor: "#F4F4F4" }}>
        <center>
          <small
            style={{ fontSize: "14px", letterSpacing: "2px" }}
            className="text-muted text-capitalize"
          >
            The Largest Event Management Hub In The Sri Lanka
          </small>
        </center>
      </div>
      <Navbar />
      <div className="bg-image">
        <img
          src="https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg"
          className="img-fluid"
          alt="Sample"
        />
        <div className="mask" style={{ backgroundColor: "#292929" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <p
              className="text-white h1 mb-0 text-uppercase"
              style={{ fontSize: "55px", letterSpacing: "2px" }}
            >
              View All Crew
            </p>
          </div>
        </div>
      </div>
      <MDBCard
        className="my-5 mx-auto"
        style={{ maxWidth: "800px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Crew Name"
              type="text"
              fullWidth
              value={crewName}
              onChange={(e) => setCrewName(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
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
                inputProps: {
                  min: new Date().toISOString().split("T")[0],
                },
              }}
            />
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </MDBCard>
      <div className="row" style={{ padding: "30px" }}>
        {data?.map((crew, index) => {
          return (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100">
                <div
                  className="card-header text-white"
                  style={{ backgroundColor: "#00A36C" }}
                >
                  <h5 className="card-title">{crew.name}</h5>
                  <h6 className="card-subtitle mb-2">{crew.category}</h6>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Crew ID:</strong>{" "}
                    <a
                      href={`/CrewePost/${crew._id}`}
                      style={{ textDecoration: "none" }}
                    >{`CID${crew._id.substr(0, 7)}`}</a>
                  </p>
                  <p className="card-text">
                    <strong>Gender:</strong> {crew.gender}
                  </p>
                  <p className="card-text">
                    <strong>Phone Number:</strong> {crew.contact}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {crew.from}
                  </p>
                  <p className="card-text">
                    <strong>Cost:</strong> {crew.cost}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Crew;
