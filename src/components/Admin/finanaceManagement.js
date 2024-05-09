import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./adminNav";
import LineChartModal from "./BudgetChart";

function FinanceDashboard() {
  const [budget, setBudget] = useState([]);
  const [payment, setPayment] = useState([]);
  const [req, setReq] = useState([]);
  const [place, setPlace] = useState([]);
  const [crew, setCrew] = useState([]);
  const [sponsor, setSponsor] = useState([]);
  const [submit, setSubmit] = useState(true);
  const bid = "Bug" + generateId();
  const [placeAbudget, setPlaceAbudget] = useState(0);
  const [placePbudget, setPlacePbudget] = useState(0);
  const [crewAbudget, setCrewAbudget] = useState(0);
  const [crewPbudget, setCrewPbudget] = useState(0);
  const [promoAbudget, setPromoAbudget] = useState(0);
  const [promoPbudget, setPromoPbudget] = useState(0);
  const [fullBudget, setFullBudget] = useState();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [status, setStatus] = useState("Process");
  const [editBtn, setEditBtn] = useState(false);
  const [searchMail, setSearchMail] = useState("");

  // --------------------------
  const [modalOpen, setModalOpen] = useState(false);
  let [selectedBudgetItem, setSelectedBudgetItem] = useState();

  // Function to handle opening the modal and setting the selected budget item
  const handleOpen = (budget) => {
    setSelectedBudgetItem(budget);
    setModalOpen(true); 
  };

  // Function to close the modal
  const handleClose = () => {
    setModalOpen(false);
  };

  function generateId() {
    let id = "";
    for (let i = 0; i < 9; i++) {
      id += Math.floor(Math.random() * 10);
    }
    return id;
  }

  const valid = () => {
    if (name != "" && mail != "") {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  };

  async function submiting(e) {
    e.preventDefault();
    const budget = {
      bid,
      name,
      placeAbudget,
      placePbudget,
      crewAbudget,
      crewPbudget,
      promoAbudget,
      promoPbudget,
      fullBudget,
      status,
      mail,
    };

    axios
      .post(global.APIUrl + "/budget/addbudget", budget)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Budget Added",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/FinanceDashboard";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Not Added",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  }

  const getBudget = async () => {
    try {
      const res = await axios.get(global.APIUrl + "/budget/allbudgets/");
      setBudget(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReq = async () => {
    try {
      const res = await axios.get(global.APIUrl + "/eventReq/allEventReq/");
      setReq(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaces = async () => {
    try {
      const res = await axios.get(global.APIUrl + "/place");
      setPlace(res.data.existingPosts);
    } catch (error) {
      console.log(error);
    }
  };
  const getCrews = async () => {
    try {
      const res = await axios.get(global.APIUrl + "/crew");
      setCrew(res.data.existingPosts);
    } catch (error) {
      console.log(error);
    }
  };
  const getSponsors = async () => {
    try {
      const res = await axios.get(global.APIUrl + "/sponsor");
      setSponsor(res.data.existingPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const getPayments = async () => {
    try {
      const res = await axios.get(global.APIUrl + "/payment/allpayment/");
      setPayment(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  function remove(bid) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this Budget?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Remove it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(global.APIUrl + "/budget/deletebudget/" + bid)
          .then((res) => {
            Swal.fire("Deleted!", "Budget Removed.", "success").then((okay) => {
              if (okay) {
                window.location.href = "/FinanceDashboard";
              }
            });
          })
          .catch((err) => {
            Swal.fire("error", "Budget Not Removed", "error");
          });
      } else {
        window.location.href = "/FinanceDashboard";
      }
    });
  }

  const edit = (
    bid,
    mail,
    name,
    placeAbudget,
    placePbudget,
    crewAbudget,
    crewPbudget,
    promoAbudget,
    promoPbudget,
    fullBudget,
    status
  ) => {
    localStorage.setItem("bid", bid);
    setName(name);
    setMail(mail);
    setPlaceAbudget(placeAbudget);
    setPlacePbudget(placePbudget);
    setCrewAbudget(crewAbudget);
    setCrewPbudget(crewPbudget);
    setPromoAbudget(promoAbudget);
    setPromoPbudget(promoPbudget);
    setFullBudget(fullBudget);
    setStatus(status);
    setEditBtn(true);
  };

  const editing = (e) => {
    e.preventDefault();
    var bid = localStorage.getItem("bid");
    const budget = {
      bid,
      name,
      placeAbudget,
      placePbudget,
      crewAbudget,
      crewPbudget,
      promoAbudget,
      promoPbudget,
      fullBudget,
      status,
      mail,
    };
    axios
      .put(global.APIUrl + "/budget/updatebudget/", budget)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Budget Updated",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/FinanceDashboard";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Not Updated",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  };

  const accept = (
    bid,
    mail,
    name,
    placeAbudget,
    placePbudget,
    crewAbudget,
    crewPbudget,
    promoAbudget,
    promoPbudget,
    fullBudget,
    status
  ) => {
    var status = "Paid";
    const budget = {
      bid,
      name,
      placeAbudget,
      placePbudget,
      crewAbudget,
      crewPbudget,
      promoAbudget,
      promoPbudget,
      fullBudget,
      status,
      mail,
    };
    axios
      .put(global.APIUrl + "/budget/updatebudget/", budget)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Budget Accepted",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/FinanceDashboard";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Not Accepted",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  };

  const reject = (
    bid,
    mail,
    name,
    placeAbudget,
    placePbudget,
    crewAbudget,
    crewPbudget,
    promoAbudget,
    promoPbudget,
    fullBudget,
    status
  ) => {
    var status = "Rejected";
    const budget = {
      bid,
      name,
      placeAbudget,
      placePbudget,
      crewAbudget,
      crewPbudget,
      promoAbudget,
      promoPbudget,
      fullBudget,
      status,
      mail,
    };
    axios
      .put(global.APIUrl + "/budget/updatebudget/", budget)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Budget Rejected",
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/FinanceDashboard";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Not Rejected",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
      });
  };

  const getSearchMail = async () => {
    try {
      const res = await axios.get(
        `${global.APIUrl}/budget/allbudgets/${searchMail}`
      );
      setBudget(res.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getPayments();
    getPlaces();
    getSponsors();
    getCrews();
    getBudget();
    getReq();
    valid();
    setFullBudget(
      parseInt(placeAbudget) +
        parseInt(placePbudget) +
        parseInt(crewAbudget) +
        parseInt(crewPbudget) -
        parseInt(promoAbudget) -
        parseInt(promoPbudget)
    );
  }, [
    placeAbudget,
    placePbudget,
    crewAbudget,
    crewPbudget,
    promoAbudget,
    promoPbudget,
    name,
    mail,
  ]);

  return (
    <div class="dashboard-main-wrapper">
      <Navbar />
      <div class="dashboard-wrapper">
        <div style={{ paddingTop: "3%", paddingLeft: "2%", width: "98%" }}>
          <h4
            className="text-uppercase  d-letter-spacing fw-bold"
            style={{ color: "black" }}
          >
            <i class="fas fa-home"></i> Finance Dashboard
          </h4>
          <hr />
          <div
            className="container-fluid bg-white"
            style={{
              paddingLeft: "5%",
              paddingTop: "2%",
              paddingBottom: "2%",
              paddingRight: "5%",
            }}
          >
            <MDBRow className="mt-3">
              <MDBCol sm="3"></MDBCol>
              <MDBCol sm="6">
                <MDBCard className="shadow-0">
                  <MDBCardBody className="bg-light">
                    <center>
                      {editBtn ? (
                        <h4>Edit Budget Form</h4>
                      ) : (
                        <h4>Add Budget Form</h4>
                      )}
                    </center>
                    <form>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          ID
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          value={bid}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Name of Req
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          value={name}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Client Mail
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setMail(e.target.value);
                          }}
                          value={mail}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Budget For Place Actual Cost (LKR)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setPlaceAbudget(Math.max(0, e.target.value));
                          }}
                          value={placeAbudget}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Budget For Place Profit Cost (LKR)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setPlacePbudget(Math.max(0, e.target.value));
                          }}
                          value={placePbudget}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Budget For Crew Actual Cost (LKR)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setCrewAbudget(Math.max(0, e.target.value));
                          }}
                          value={crewAbudget}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Budget For Crew Profit Cost (LKR)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setCrewPbudget(Math.max(0, e.target.value));
                          }}
                          value={crewPbudget}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Budget For Promotion Actual Cost (LKR)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setPromoAbudget(Math.max(0, e.target.value));
                          }}
                          value={promoAbudget}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Budget For Promotion Profit Cost (LKR)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setPromoPbudget(Math.max(0, e.target.value));
                          }}
                          value={promoPbudget}
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label h6"
                        >
                          Full Budget (LKR)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder=""
                          value={fullBudget}
                          disabled
                        />
                      </div>

                      <div className="text-end">
                        {editBtn ? (
                          <button
                            type="button"
                            class="btn btn-success d-letter-spacing "
                            onClick={editing}
                            disabled={submit}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            type="button"
                            class="btn btn-success d-letter-spacing "
                            onClick={submiting}
                            disabled={submit}
                          >
                            Save
                          </button>
                        )}
                        &nbsp;&nbsp;&nbsp;
                        <a href="../Admin">
                          <MDBBtn
                            className="btn-sm"
                            outline
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                              letterSpacing: "2px",
                            }}
                            color="dark"
                          >
                            Back
                          </MDBBtn>
                        </a>
                      </div>
                    </form>
                    <br />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <div className="text-end mt-5"></div>

              <div className=" pt-1 mt-5">
                <h6>Search By Mail</h6>
                <MDBInput
                  className="mt-3 bg-white"
                  id="form1"
                  type="text"
                  onChange={(e) => {
                    setSearchMail(e.target.value);
                  }}
                />
                <br />
                <button
                  type="button"
                  class="btn btn-success d-letter-spacing "
                  onClick={getSearchMail}
                >
                  Go
                </button>
              </div>
              <h2 style={{ paddingTop: "40px" }}>Added Budget</h2>
              <hr />
              <MDBTable borderless className="mt-3">
                <MDBTableHead>
                  <tr className="bg-dark">
                    <th scope="col" className="text-white d-letter-spacing h6">
                      ID
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Client Mail
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Req Name
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Place Budget
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Crew Budget
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Promo Budget
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Full Budget
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-white d-letter-spacing h6 text-center"
                    >
                      Action
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {budget.map((budget, key) => (
                    <tr className="bg-light">
                      <td>
                        <h6>{budget.bid}</h6>
                      </td>
                      <td>
                        <h6>{budget.mail}</h6>
                      </td>
                      <td>
                        <h6>{budget.name}</h6>
                      </td>
                      <td>
                        <h6>{budget.placeAbudget + budget.placePbudget}</h6>
                      </td>
                      <td>
                        <h6>{budget.crewAbudget + budget.crewPbudget}</h6>
                      </td>
                      <td>
                        <h6>{budget.promoAbudget + budget.promoPbudget}</h6>
                      </td>
                      <td>
                        <h6>{budget.fullBudget}</h6>
                      </td>
                      <td>
                        <h6>{budget.status}</h6>
                      </td>
                      <td className="text-center">
                        <div className="col">
                          <div className="row">
                            {budget.status === "Rejected" ? (
                              <button
                                size="sm"
                                className="shadow-0"
                                color="success"
                                type="submit"
                                onClick={() =>
                                  accept(
                                    budget.bid,
                                    budget.mail,
                                    budget.name,
                                    budget.placeAbudget,
                                    budget.placePbudget,
                                    budget.crewAbudget,
                                    budget.crewPbudget,
                                    budget.promoAbudget,
                                    budget.promoPbudget,
                                    budget.fullBudget,
                                    budget.status
                                  )
                                }
                              >
                                <MDBIcon fas icon="check-circle" />
                              </button>
                            ) : (
                              <button
                                size="sm"
                                className="shadow-0"
                                color="danger"
                                type="submit"
                                onClick={() =>
                                  reject(
                                    budget.bid,
                                    budget.mail,
                                    budget.name,
                                    budget.placeAbudget,
                                    budget.placePbudget,
                                    budget.crewAbudget,
                                    budget.crewPbudget,
                                    budget.promoAbudget,
                                    budget.promoPbudget,
                                    budget.fullBudget,
                                    budget.status
                                  )
                                }
                              >
                                <MDBIcon fas icon="times-circle" />
                              </button>
                            )}
                          </div>

                          <br />

                          {budget.status !== "Paid" && (
                            <>
                              <div className="row">
                                <MDBBtn
                                  size="sm"
                                  className="shadow-0"
                                  color="danger"
                                  onClick={() => remove(budget.bid)}
                                >
                                  <MDBIcon fas icon="trash-alt" />
                                </MDBBtn>
                              </div>
                              <br />
                              <div className="row">
                                <button
                                  size="sm"
                                  className="shadow-0"
                                  color="dark"
                                  type="submit"
                                  onClick={() =>
                                    edit(
                                      budget.bid,
                                      budget.mail,
                                      budget.name,
                                      budget.placeAbudget,
                                      budget.placePbudget,
                                      budget.crewAbudget,
                                      budget.crewPbudget,
                                      budget.promoAbudget,
                                      budget.promoPbudget,
                                      budget.fullBudget,
                                      budget.status
                                    )
                                  }
                                >
                                  <MDBIcon fas icon="edit" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                        <br />
                        <button
                          size="sm"
                          className="shadow-0"
                          color="danger"
                          type="button"
                          onClick={() => handleOpen(budget)} // Pass the budget item data to the handleOpen function
                        >
                          Graph
                        </button>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <h2 style={{ paddingTop: "20px" }}>Customer Request</h2>
              <hr />
              <MDBTable borderless className="mt-3">
                <MDBTableHead>
                  <tr className="bg-dark">
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Id
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Date
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Mail
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Event Type
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Venue
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      V Desc
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Staff
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      S Desc
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Budget
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Status
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {req.map((evtReq, key) => (
                    <tr className="bg-light" key={key}>
                      <td>
                        <h6>{evtReq.uniqueId}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.eventDate}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.email}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.eventType}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.venuePreference}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.venueDescription}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.staffRequired}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.accessibilityRequirements}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.estimatedBudgetRange}</h6>
                      </td>
                      <td>
                        <h6>{evtReq.status}</h6>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <h2 style={{ paddingTop: "20px" }}>Paid Payment Details</h2>
              <hr />
              <MDBTable borderless className="mt-3">
                <MDBTableHead>
                  <tr className="bg-dark">
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Id
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Budget Id
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Mail
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Status
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Cost
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Date
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {payment.map((payment, key) =>
                    payment.status === "Paid" ? (
                      <tr className="bg-light" key={key}>
                        <td style={{ fontSize: "17px" }}>
                          {payment.paymentID}
                        </td>
                        <td style={{ fontSize: "17px" }}>{payment.budID}</td>
                        <td style={{ fontSize: "17px" }}>
                          {payment.cost} Rs/=
                        </td>
                        <td style={{ fontSize: "17px" }}>{payment.email}</td>
                        <td style={{ fontSize: "17px", fontWeight: "bold" }}>
                          {payment.status}
                        </td>
                        <td style={{ fontSize: "17px" }}>{payment.date}</td>
                      </tr>
                    ) : (
                      <div key={key}></div>
                    )
                  )}
                </MDBTableBody>
              </MDBTable>
              <h2 style={{ paddingTop: "20px" }}>Places</h2>
              <hr />
              <MDBTable borderless className="mt-3">
                <MDBTableHead>
                  <tr className="bg-dark">
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Name
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Address
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Phone Number
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Category
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Cost
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {place.map((place, key) => (
                    <tr className="bg-light">
                      <td>
                        <h6>{place.name}</h6>
                      </td>
                      <td>
                        <h6>{place.address}</h6>
                      </td>
                      <td>
                        <h6>{place.contact}</h6>
                      </td>
                      <td>
                        <h6>{place.category}</h6>
                      </td>
                      <td>
                        <h6>{place.cost}</h6>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <h2 style={{ paddingTop: "20px" }}>Crew</h2>
              <hr />
              <MDBTable borderless className="mt-3">
                <MDBTableHead>
                  <tr className="bg-dark">
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Name
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Category
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Phone Number
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Cost
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {crew.map((crew, key) => (
                    <tr className="bg-light">
                      <td>
                        <h6>{crew.name}</h6>
                      </td>
                      <td>
                        <h6>{crew.category}</h6>
                      </td>
                      <td>
                        <h6>{crew.contact}</h6>
                      </td>
                      <td>
                        <h6>{crew.cost}</h6>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <h2 style={{ paddingTop: "20px" }}>Sponsorship</h2>
              <hr />
              <MDBTable borderless className="mt-3">
                <MDBTableHead>
                  <tr className="bg-dark">
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Name
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Address
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Phone Number
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Category
                    </th>
                    <th scope="col" className="text-white d-letter-spacing h6">
                      Cost
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {sponsor.map((sponsor, key) => (
                    <tr className="bg-light">
                      <td>
                        <h6>{sponsor.name}</h6>
                      </td>
                      <td>
                        <h6>{sponsor.address}</h6>
                      </td>
                      <td>
                        <h6>{sponsor.contact}</h6>
                      </td>
                      <td>
                        <h6>{sponsor.category}</h6>
                      </td>
                      <td>
                        <h6>{sponsor.cost}</h6>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBRow>
          </div>
          <LineChartModal
            open={modalOpen}
            handleClose={handleClose}
            dataa={selectedBudgetItem}
          />
        </div>
      </div>
    </div>
  );
}
export default FinanceDashboard;
