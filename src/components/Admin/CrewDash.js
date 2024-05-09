import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from "./adminNav";


export default class CrewDash extends Component {

  //Binding event handler method
  constructor(props) {
    super(props);

    //Initializing local state by assigning an object to this.state
    this.state = {
      crew: []
    };
  }
  //load data from a remote endpoint
  componentDidMount() {
    this.retriveCrew();
  }


  retriveCrew() {
    //get server side http module to get data to client side Http request
    axios.get(global.APIUrl+"/crew").then(res => {
      if (res.data.success) {
        this.setState({
          crew: res.data.existingPosts
        });

        console.log(this.state.crew);
      }

    });
  }

  //delete a material card
  onDelete = (id) => {

    axios.delete(global.APIUrl+`/crew/deletecrew/${id}`).then((res) => {
      Swal.fire('Deleted', 'Deleted Successfilly', 'success')
      this.retriveCrew();
    })
  }


  //filter data
  filterData(crew, searchKey) {

    const result = crew.filter((crew) =>

      crew.name.toLowerCase().includes(searchKey) ||
      crew.category.toLowerCase().includes(searchKey)
    )

    this.setState({ crew: result })

  }

  //Search Function
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get(global.APIUrl+"/crew").then(res => {
      if (res.data.success) {

        this.filterData(res.data.existingPosts, searchKey)

      }
    });


  }
  //gather outputs
  render() {
    return (

      <div class="dashboard-main-wrapper" >
        <Navbar />
        <div style={{ padding: '30px' }} class="dashboard-wrapper">
          <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Crew Management Dashboard</h4>
          <hr />
          <div className="container-fluid bg-light ">
            <br />
            <button className="btn btn-info" style={{ backgroundColor: "#00A36C" }} ><a href="/CrewCreate" style={{ textDecoration: 'none', color: 'white' }}>Add New Crew Profile &nbsp;
              <i class="fas fa-plus-circle"></i>
            </a></button>
            <center>
              <div className="col-lg-4 mt-2 mb-3">

                <input
                  className="form-control "
                  type="search"
                  placeholder="Search Crew Details"
                  name="searchQuery"
                  onChange={this.handleSearchArea}>

                </input>
              </div>             
            </center>

            <div className="p-3 mb-2 text-light rounded-3" style={{ backgroundColor: "" }} >
              <div class="container text-center">
                <div class="row">
                  <div class="col">
                    <div class="card">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="bouncer teams" onChange={this.handleSearchArea} />
                        <label class="form-check-label" for="exampleRadios1">
                          Bouncer Teams
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="form-check" >
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="chef teams" onChange={this.handleSearchArea} />
                        <label class="form-check-label" for="exampleRadios2">
                          Chef Teams
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="dj music" onChange={this.handleSearchArea} />
                        <label class="form-check-label" for="exampleRadios3">
                          DJ Music
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="dancing teams" onChange={this.handleSearchArea} />
                        <label class="form-check-label" for="exampleRadios4">
                          Dancing Teams
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="card">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="bar tenders" onChange={this.handleSearchArea} />
                        <label class="form-check-label" for="exampleRadios5">
                          Bar Tenders
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="form-check" >
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="ushering teams" onChange={this.handleSearchArea} />
                        <label class="form-check-label" for="exampleRadios16">
                          Ushering Teams
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios7" value="music bands" onChange={this.handleSearchArea} />
                        <label class="form-check-label" for="exampleRadios7">
                          Music Bands
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios8" value="photography" onChange={this.handleSearchArea} />
                        <label class="form-check-label" for="exampleRadios8">
                          Photography
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="row">
              {/* Map over the crew data and generate cards */}
              {this.state.crew.map((crew, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100">
                    <div className="card-header text-white" style={{ backgroundColor: "#00A36C" }}>
                      <h5 className="card-title">{crew.name}</h5>
                      <h6 className="card-subtitle mb-2">{crew.category}</h6>
                    </div>
                    <div className="card-body">
                      <p className="card-text"><strong>Crew ID:</strong> <a href={`/CrewePost/${crew._id}`} style={{ textDecoration: 'none' }}>{`CID${crew._id.substr(0, 7)}`}</a></p>
                      <p className="card-text"><strong>Gender:</strong> {crew.gender}</p>
                      <p className="card-text"><strong>Phone Number:</strong> {crew.contact}</p>
                      <p className="card-text"><strong>Location:</strong> {crew.from}</p>
                      <p className="card-text"><strong>Cost:</strong> {crew.cost}</p>                      
                      <a href={`/CrewEdit/${crew._id}`} className="btn btn-dark btn-sm mr-2">Edit</a>
                      <button className="btn btn-danger btn-sm" onClick={() => this.onDelete(crew._id)}>Delete</button>
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



















