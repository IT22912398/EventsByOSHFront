import React, { Component } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import Navbar from "./adminNav";


export default class SponasorDash extends Component {

//Binding event handler method
constructor(props){
  super(props);

//Initializing local state by assigning an object to this.state
  this.state={
    sponsor:[]
  };
}
//load data from a remote endpoint
componentDidMount(){
  this.retriveSponsor();
}


retriveSponsor(){
  //get server side http module to get data to client side Http request
  axios.get(global.APIUrl+"/sponsor").then(res =>{
      if(res.data.success){
        this.setState({
            sponsor:res.data.existingPosts
        });

        console.log(this.state.sponsor);
      }

  });
}

//delete a material card
onDelete = (id) =>{

  axios.delete(global.APIUrl+`/sponsor/deletesponsor/${id}`).then((res) =>{
    Swal.fire('Deleted','Deleted Successfilly','success')
    this.retriveSponsor();
  })
}


//filter data
filterData(sponsor,searchKey){

const result = sponsor.filter((sponsor) =>
  
sponsor.name.toLowerCase().includes(searchKey) ||
sponsor.address.toLowerCase().includes(searchKey)||
sponsor.category.toLowerCase().includes(searchKey)
)

this.setState({sponsor:result})

}

//Search Function
handleSearchArea = (e) =>{

  const searchKey= e.currentTarget.value;

  axios.get(global.APIUrl+"/sponsor").then(res =>{
      if(res.data.success){

        this.filterData(res.data.existingPosts,searchKey)

      }
  });
}
  //gather outputs
  render() {
    return (

        <div class="dashboard-main-wrapper" >
        <Navbar />
        <div style={{ padding: '30px' }} class="dashboard-wrapper">

        <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i> Sponsor Management Dashboard</h4>
        <hr/>
        <div className="container-fluid bg-light ">
            
            <br/>
            <button className="btn btn-info" style={{ backgroundColor: "#00A36C" }} ><a href="/SponsorCreate" style={{textDecoration:'none',color:'white'}}>Add New Sponsor Profile &nbsp;
        <i class="fas fa-plus-circle"></i> 
          </a></button>


          <center>
          <div className="col-lg-4 mt-2 mb-3">
        
        <input
        className="form-control "
        type="search"
        placeholder="Search Sponsor Details"
        name="searchQuery"
        onChange={this.handleSearchArea}>

        </input>
        </div>        
        </center>
             
        <table className="table table-hover  table table-bordered border-dark table table-light table-striped" style={{marginTop:'5px'}}>
           <thead>
             <tr>
               <th scope="col">#</th>
               <th scope="col">Sponsor ID</th>
               <th scope="col">Sponsor Name</th>
               <th scope="col">Address</th>
               <th scope="col">Phone Number</th>
               <th scope="col">Cost</th>
               <th scope="col">Description</th>
               <th scope="col">Category</th>
               <th scope="col">Action</th>
             </tr>
           </thead>
           <tbody>
             {/* Get data to the table using a map */}
             {this.state.sponsor.map((sponsor,index) =>(
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                      <a href={`/SponsorPost/${sponsor._id}`} style={{textDecoration:'none'}}>                     
                      {`SID${sponsor._id.substr(0,7)}`}
                      </a>
                      </td>
                    <td>{sponsor.name}</td>
                    <td>{sponsor.address}</td>
                    <td>{sponsor.contact}</td>
                    <td>{sponsor.cost}</td>
                    <td>{sponsor.description}</td>
                    <td>{sponsor.category}</td>                
                    <td>
                      {/* Edit button */}
                      <a className="btn btn-dark" href={`/SponsorEdit/${sponsor._id}`}>
                        <i className="fas fa-edit"></i>
                      </a>
                      &nbsp;
                      {/* Delete Button */}
                      <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(sponsor._id)}>
                        <i className="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
            ))}
            </tbody>          
         </table>

         </div>
         </div>   
         </div>  
     

      
    )
  }
}