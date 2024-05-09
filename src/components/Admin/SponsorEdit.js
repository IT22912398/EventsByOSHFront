import React, { Component } from 'react'
import axios from 'axios'
import Navbar from "./adminNav"
import Swal from 'sweetalert2';

export default class SponsorEdit extends Component {

  //Binding event handler method
  constructor(props) {
    super(props);
    this.state = {
      sponsorID: "",
      name: "",
      address: "",
      contact: "",
      cost: "",
      description: "",
      category: "",
      placeIDError: "",
      nameError: "",
      addressError: "",
      contactError: "",
      costError: "",
      descriptionError: "",
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
    let placeIDError = "";
    let nameError = "";
    let addressError = "";
    let contactError = "";
    let costError = "";
    let descriptionError = "";
    let categoryError = "";



    if (!this.state.name) {
      nameError = "*Place name is Required!"
    }
    if (!this.state.address) {
      addressError = "*Address is Required!"
    }
    if (!this.state.contact) {
      contactError = "*Phone Number is Required"
    }
    if (!this.state.cost) {
      costError = "*Cost is Required"
    }
    if (!this.state.description) {
      descriptionError = "*Description is Required"
    }
    if (!this.state.category) {
      categoryError = "*Category is Required"
    }
    if (placeIDError || nameError || addressError || contactError || costError || descriptionError || categoryError) {
      this.setState({ placeIDError, nameError, addressError, contactError, costError, descriptionError, categoryError });
      return false;
    }
    return true;

  }
  //onsubmit method
  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    const id = this.props.match.params.id;

    const { placeID, name, address, contact, cost, description, category } = this.state;

    const data = {
      placeID: placeID,
      name: name,
      address: address,
      contact: contact,
      cost: cost,
      description: description,
      category: category

    }
    //if validation succussesfully pass
    if (isValid) {
      console.log(data)
      //Put data to back end using the Http link
      axios.put(global.APIUrl + `/sponsor/updatesponsor/${id}`, data).then((res) => {
        if (res.data.success) {
          Swal.fire('Updated', 'Sponsor Updated Successfully', 'success')
          this.setState(
            {
              sponsorID: "",
              name: "",
              address: "",
              contact: "",
              cost: "",
              description: "",
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

    axios.get(global.APIUrl + `/sponsor/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          sponsorID: res.data.sponsor.sponsorID,
          name: res.data.sponsor.name,
          address: res.data.sponsor.address,
          contact: res.data.sponsor.contact,
          cost: res.data.sponsor.cost,
          description: res.data.sponsor.description,
          category: res.data.sponsor.category
        });

        console.log(this.state.sponsor);
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
          <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-add"></i> Update Sponsor Profiles</h4>
          <hr />
          <div className="container-fluid bg-light ">
            <br />
            <a href="/SponsorDash">
              <button className="btn btn-dark" >

                <i class="fa-solid fa-circle-left"></i>


              </button>
            </a>
            <form style={{ paddingLeft: '200px', paddingRight: '200px', paddingTop: '30px' }} className="needs-validation" noValidate>

              <div class="row">
                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Sponsor ID</label>
                  <input type="text" class="form-control" name="sponsorID" placeholder="Enter Sponsor ID"
                    value={`SID${id.substr(0, 7)}`}
                    readOnly
                    onChange={this.handleInputChange}
                  />

                </div>

                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Sponsor Name</label>
                  <input type="text" class="form-control" name="name" placeholder="Enter Place Name"
                    value={this.state.name}
                    readOnly
                    onChange={this.handleInputChange}
                    required
                    disabled
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.nameError}
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Address</label>
                  <input type="text" class="form-control" name="address" placeholder="Enter Address"
                    value={this.state.address}
                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.addressError}
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
                  <label style={{ marginBottom: '5px' }} >Cost (Rs.)</label>
                  <input type="number" class="form-control" name="cost" placeholder="Enter Cost"
                    value={this.state.cost}

                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.costError}
                  </div>
                </div>

                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Description</label>
                  <input type="text" class="form-control" name="description" placeholder="Enter Description"
                    value={this.state.description}

                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.descriptionError}
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
                    <option value="Silver Sponsor">Silver Sponsor</option>
                    <option value="Gold Sponsor">Gold Sponsor</option>
                    <option value="Platinum Sponsor">Platinum Sponsor</option>

                  </select>
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.categoryError}
                  </div>
                </div>

              </div>


              <hr />
              <button className="btn btn-dark" type="submit" onClick={this.onSubmit}>
                <i className="far fa-check-square"></i>
                &nbsp; Update Sponsor Profile
              </button>

            </form>
          </div>
        </div>
      </div>

    )
  }
}