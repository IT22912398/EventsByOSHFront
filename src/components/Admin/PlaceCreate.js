import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import Navbar from "./adminNav";


export default class CrewCreate extends Component {

  //handle data to database
  constructor(props) {
    super(props);
    this.state = {

      name: "",
      address: "",
      contact: "",
      cost: "",
      description: "",
      image: "",
      category: "",


      nameError: "",
      addressError: "",
      contactError: "",
      costError: "",
      descriptionError: "",
      imageError: "",
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

    let nameError = "";
    let addressError = "";
    let contactError = "";
    let costError = "";
    let descriptionError = "";
    let imageError = "";
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
    if (!this.state.image) {
      imageError = "*Image is Required"
    }
   if (!this.state.category) {
      categoryError = "*Category is Required"
    }





    if (nameError || addressError || contactError || costError || descriptionError || imageError || categoryError) {
      this.setState({ nameError, addressError, contactError, costError, descriptionError, imageError, categoryError });
      return false;

    }

    return true;

  }

  //onsubmit method
  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    const { name, address, contact, cost, description, image, category } = this.state;

    const data = {

      name: name,
      address: address,
      contact: contact,
      cost: cost,
      description: description,
      image: image,
      category: category

    }


    //if validation succussesfully pass
    if (isValid) {
      console.log(data)
      //Post data to back end using the Http link
      axios.post(global.APIUrl + "/place/save", data).then((res) => {
        if (res.data.success) {
          Swal.fire('Added', 'Place Added Successfilly', 'success')
          this.setState(
            {
              name: "",
              address: "",
              contact: "",
              cost: "",
              description: "",
              image: "",
              category: ""
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
          <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-add"></i> Add Place Details</h4>
          <hr />
          <div className="container-fluid bg-light ">
            <br />

            <a href="/PlaceDash">
              <button className="btn btn-dark" >

                <i class="fa-solid fa-circle-left"></i>


              </button>
            </a>
            <form style={{ paddingLeft: '200px', paddingRight: '200px', paddingTop: '30px' }} className="needs-validation" noValidate>




              <div className="row">
                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Place Name</label>
                  <input type="text" class="form-control" name="name" placeholder="Enter Place Name"
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
                  <label style={{ marginBottom: '5px' }} >Contact</label>
                  <input type="number" class="form-control" name="contact" placeholder="Enter Contact"
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
              </div>


              <div className="row">
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
              </div>
              <div className="row">
                <div class="col">
                  <label style={{ marginBottom: '5px' }} >Image</label>
                  <input type="text" class="form-control" name="image" placeholder="Enter Image"
                    value={this.state.image}
                    onChange={this.handleInputChange}
                    required
                  />
                  <div style={{ fontSize: 15, color: "red" }}>
                    {this.state.imageError}
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
                    <option value="Indoor">Indoor</option>
                    <option value="OutDoor">OutDoor</option>                    
                    {/* Add more options as needed */}
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
                  &nbsp; Add Place
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