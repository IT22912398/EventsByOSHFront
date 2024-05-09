import React, { Component } from 'react'
import axios from 'axios'
import Navbar from "./adminNav"
import Swal from 'sweetalert2';

export default class CrewEdit extends Component {

  //Binding event handler method
  constructor(props) {
    super(props);
    this.state = {
      crewID: "",
      name: "",
      gender: "",
      contact: "",
      from: "",
      cost: "",
      category: "",
      crewIDError: "",
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

    this.setState({
      ...this.state,
      [name]: value
    })

  }

  //validation
  validate = () => {
    let crewIDError = "";
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
    if (!this.state.from) {
      fromError = "*Location is Required"
    }
    if (!this.state.cost) {
      costError = "*Cost is Required"
    }
    if (!this.state.category) {
      categoryError = "*Category Required"
    }
    if (crewIDError || nameError || genderError || contactError || fromError || costError || categoryError) {
      this.setState({ crewIDError, nameError, genderError, contactError, fromError, costError, categoryError });
      return false;
    }
    return true;

  }
  //onsubmit method
  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    const id = this.props.match.params.id;

    const { crewID, name, gender, contact, from, cost, category } = this.state;

    const data = {
      crewID: crewID,
      name: name,
      gender: gender,
      contact: contact,
      from: from,
      cost: cost,
      category: category

    }
    //if validation succussesfully pass
    if (isValid) {
      console.log(data)
      //Put data to back end using the Http link
      axios.put(global.APIUrl + `/crew/updatecrew/${id}`, data).then((res) => {
        if (res.data.success) {
          Swal.fire('Updated', 'Crew Updated Successfully', 'success')
          this.setState(
            {
              crewID: "",
              name: "",
              gender: "",
              contact: "",
              from: "",
              cost: "",
              category: ""
            }
          )
        }
      })
    }

  }
  //load data from a remote endpoint
  componentDidMount() {

    const id = this.props.match.params.id;

    axios.get(global.APIUrl + `/crew/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          crewID: res.data.crew.crewID,
          name: res.data.crew.name,
          gender: res.data.crew.gender,
          contact: res.data.crew.contact,
          from: res.data.crew.from,
          cost: res.data.crew.cost,
          category: res.data.crew.category
        });

        console.log(this.state.crew);
      }
    });
  }



  //gather outputs
  render() {
    const id = this.props.match.params.id;
    return (

      <div class="dashboard-main-wrapper" >
        <Navbar />
        <div style={{ padding: '30px' }} class="dashboard-wrapper">
          <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-add"></i> Update Crew Profiles</h4>
          <hr />


          <div className="container-fluid bg-light ">
            <br />
            <a href="/CrewDash">
              <button className="btn btn-dark" >

                <i class="fa-solid fa-circle-left"></i>


              </button>
            </a>

            <form style={{ paddingLeft: '200px', paddingRight: '200px', paddingTop: '30px' }} className="needs-validation" noValidate>

              <div class="row">
                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Crew ID</label>
                  <input type="text" class="form-control" name="crewID" placeholder="Enter Crew ID"
                    value={`CRW${id.substr(0, 7)}`}
                    readOnly
                    onChange={this.handleInputChange}
                  />

                </div>

                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Crew Name</label>
                  <input type="text" class="form-control" name="name" placeholder="Enter Name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                    readOnly
                    disabled
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.nameError}
                  </div>
                </div>
              </div>


              <div class="row">
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
                  <label style={{ marginBottom: '5px' }} >Phone Number</label>
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




              <div class="row">
                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Location</label>
                  <input type="text" class="form-control" name="from" placeholder="Enter Location"
                    value={this.state.from}

                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.fromError}
                  </div>
                </div>

                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Cost</label>
                  <input type="text" class="form-control" name="cost" placeholder="Enter Cost"
                    value={this.state.cost}

                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.costError}
                  </div>
                </div>

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

                    {/* Add more options as needed */}
                  </select>
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.categoryError}
                  </div>
                </div>
              </div>


              <hr />
              <button className="btn btn-dark" type="submit" onClick={this.onSubmit}>
                <i className="far fa-check-square"></i>
                &nbsp; Update Card
              </button>

              <br />
              <br />

            </form>
          </div>
        </div>
      </div>

    )
  }
}