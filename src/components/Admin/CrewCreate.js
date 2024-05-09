import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import Navbar from "./adminNav";
// import moment from 'moment';

export default class CrewCreate extends Component {

  //handle data to database
  constructor(props) {
    super(props);
    this.state = {

      name: "",
      gender: "",
      contact: "",
      from: "",
      cost: "",
      category: "",
      nameError: "",
      genderError: "",
      contactError: "",
      fromError: "",
      costError: "",
      categoryError: ""

    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact" && value.length > 10) {
      return;
    }
  

    this.setState({
      ...this.state,
      [name]: value
    })

  }


  //validation
  validate = () => {

    let nameError = "";
    let genderError = "";
    let contactError = "";
    let fromError = "";
    let costError = "";
    let categoryError = "";



    if (!this.state.name) {
      nameError = "*Crew name is Required!"
    }

    if (!this.state.gender) {
      genderError = "*Gender is Required!"
    }
    if (!this.state.contact) {
      contactError = "*Phone Number is Required"
    }
  

    else if (!this.state.contact || this.state.contact.length > 10 || isNaN(this.state.contact)) {
      contactError = "*Please enter a valid 10-digit phone number";
    }
    

  


    if (!this.state.from) {
      fromError = "*Location is Required"
    }



    if (!this.state.cost) {
      costError = "*Crew Cost is Required"
    }
    if (!this.state.category) {
      categoryError = "*Category is Required"
    }





    if (nameError || genderError || contactError || fromError || costError || categoryError) {
      this.setState({ nameError, genderError, contactError, fromError, costError, categoryError });
      return false;

    }

    return true;

  }

  //onsubmit method
  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    const { name, gender, contact, from, cost, category } = this.state;

    if (contact.length < 10) {
      this.setState({
        contactError: 'Phone number must be 10 digits'
      });
      return;
    }


  if (isValid) {
    const data = {

      name: name,
      gender: gender,
      contact: contact,
      from: from,
      cost: cost,
      category: category

    };


    //if validation succussesfully pass
    
      //Post data to back end using the Http link
      axios.post(global.APIUrl+"/crew/save", data).then((res) => {
        if (res.data.success) {
          Swal.fire('Added', 'Crew Added Successfilly', 'success')
          this.setState(
            {

              name: "",
              gender: "",
              contact: "",
              from: "",
              cost: "",
              category: "",

            }
          )
        }
      })

    }
  }


  render() {
    return (

      <div class="dashboard-main-wrapper" >
        <Navbar />
        <div style={{ padding: '30px' }} class="dashboard-wrapper">
          <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-add"></i> Add Crew Profiles</h4>
          <hr />
          <div className="container-fluid bg-light ">
            <br />
            <a href="/CrewDash">
              <button className="btn btn-dark" >

                <i class="fa-solid fa-circle-left"></i>


              </button>
            </a>
            <form style={{ paddingLeft: '200px', paddingRight: '200px', paddingTop: '30px' }} className="needs-validation" noValidate>

              <div className="row">

                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Crew Name</label>
                  <input type="text" class="form-control" name="name" placeholder="Enter Crew Name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                  />

                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.nameError}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label style={{ marginBottom: '5px' }}>Gender</label>
                  <select
                    className="form-control"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="All Male">All Male</option>
                    <option value="All Female">All Female</option>
                    <option value="Male/Female">Male/Female</option>
                  </select>
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.genderError}
                  </div>
                </div>

                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Contact</label>
                  <input type="number" class="form-control" name="contact" placeholder="Enter Contact Number"
                    value={this.state.contact}
                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.contactError}
                  </div>
                </div>
              </div>

              <div className="row">
                <div class="col">
                  <label style={{ marginBottom: '5px' }} >From</label>
                  <input type="text" class="form-control" name="from" placeholder="Enter Location Details"
                    value={this.state.from}
                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.fromError}
                  </div>
                </div>

                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Cost (Rs.) - Per Person</label>
                  <input type="number" class="form-control" name="cost" placeholder="Enter Cost "
                    value={this.state.cost}
                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.costError}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label style={{ marginBottom: '5px' }}>Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Bouncer Teams">Bouncer Teams</option>
                    <option value="Chef Teams">Chef Teams</option>
                    <option value="DJ Music">DJ Music</option>
                    <option value="Dancing Teams">Dancing Teams</option>
                    <option value="Bar Tenders">Bar Tenders</option>
                    <option value="Ushering Teams">Ushering Teams</option>
                    <option value="Music Bands">Music Bands</option>
                    <option value="Photography">Photography</option>

                  </select>
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.categoryError}
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <button className="btn btn-dark" type="submit" onClick={this.onSubmit}>
                  <i className="far fa-check-square"></i>
                  &nbsp; Add Crew
                </button>
                <br />
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}