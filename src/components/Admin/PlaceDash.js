import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from "./adminNav";
import * as XLSX from 'xlsx';

export default class PlaceDash extends Component {

  //Binding event handler method
  constructor(props) {
    super(props);

    //Initializing local state by assigning an object to this.state
    this.state = {
      place: []
    };
  }
  //load data from a remote endpoint
  componentDidMount() {
    this.retrivePlace();
  }


  retrivePlace() {
    //get server side http module to get data to client side Http request
    axios.get(global.APIUrl+"/place").then(res => {
      if (res.data.success) {
        this.setState({
          place: res.data.existingPosts
        });

        console.log(this.state.place);
      }

    });
  }

  //delete a material card
  onDelete = (id) => {

    axios.delete(global.APIUrl+`/place/deleteplace/${id}`).then((res) => {
      Swal.fire('Deleted', 'Deleted Successfilly', 'success')
      this.retrivePlace();
    })
  }


  //filter data
  filterData(place, searchKey) {

    const result = place.filter((place) =>

      place.name.toLowerCase().includes(searchKey) ||
      place.category.toLowerCase().includes(searchKey) ||
      place.address.toLowerCase().includes(searchKey)
    )

    this.setState({ place: result })

  }

  //Search Function
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get(global.APIUrl+"/place").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingPosts, searchKey)
      }
    });
  }

  exportToExcel = () => {
    const { place } = this.state;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(place);
    XLSX.utils.book_append_sheet(wb, ws, "Place Data");
    XLSX.writeFile(wb, "place.xlsx");
  };
  //gather outputs
  render() {
    return (

      <div class="dashboard-main-wrapper" >
        <Navbar />
        <div style={{ padding: '30px' }} class="dashboard-wrapper">
          <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Place Management Dashboard</h4>
          <hr />

          <div className="container-fluid bg-light ">

            <br />
            <button className="btn btn-info" style={{ backgroundColor: "#00A36C" }} ><a href="/PlaceCreate" style={{ textDecoration: 'none', color: 'white' }}>Add New Place &nbsp;
              <i class="fas fa-plus-circle"></i>
            </a></button>

            <center>
              <div className="col-lg-4 mt-2 mb-3">

                <input
                  className="form-control "
                  type="search"
                  placeholder="Search Place Details"
                  name="searchQuery"
                  onChange={this.handleSearchArea}>

                </input>
              </div>
              <button onClick={this.exportToExcel} className="btn btn-dark">
                <i class="fa-solid fa-file-arrow-down"></i>
              </button>
              <br />
              <br />
            </center>
            <div className="row">              
              {this.state.place.map((place, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card">
                    <img src={place.image} className="card-img-top" alt={place.image} />
                    <div className="card-body">
                      <h5 className="card-title">{place.name}</h5>
                      <p className="card-text"><strong>Place ID:</strong> <a href={`/PlacePost/${place._id}`} style={{ textDecoration: 'none' }}>{`PID${place._id.substr(0, 7)}`}</a></p>
                      <p className="card-text"><strong>Address:</strong> {place.address}</p>
                      <p className="card-text"><strong>Phone:</strong> {place.contact}</p>
                      <p className="card-text"><strong>Cost:</strong> {place.cost}</p>
                      <p className="card-text"><strong>Description:</strong> {place.description}</p>
                      <p className="card-text"><strong>Category:</strong> {place.category}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <a href={`/PlaceEdit/${place._id}`} className="btn btn-dark">Edit</a>
                        <button className="btn btn-danger" onClick={() => this.onDelete(place._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>



    )
  }
}