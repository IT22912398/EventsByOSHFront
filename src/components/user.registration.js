
import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBCardImage,
  MDBCard, MDBCardBody, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './main_parts/navbar.js';
import Footer from './main_parts/footer.js';
import passwordValidator from 'password-validator';
var schema = new passwordValidator();

function User_registration() {
  const [passwordShown, setPasswordShown] = useState(false);
  function showPassword() {
    setPasswordShown(passwordShown ? false : true);
  }

  schema
    .is().min(4)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

  const [isValidCFpassword, setIsValidCfpassword] = useState(false);
  const [isValidCFpassword2, setIsValidCfpassword2] = useState(false);
  const [messageCfpassword, setMessageCfpassword] = useState('');
  const [messageStrongpassword, setmessageStrongpassword] = useState('');
  const [password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("Customer");
  const [Registrationbtn, setRegistrationbtn] = useState(true);

  const setPasswordFunction = (event) => {
    if (schema.validate(event) === false) {
      setIsValidCfpassword2(false);
      setmessageStrongpassword('Password is not strong');

    } else {
      setIsValidCfpassword2(true);
      setmessageStrongpassword('Password is strong');

    }
    setPassword(event);
  }
  async function Registration(e) {
    e.preventDefault();

    const userReg = { password, firstName, lastName, email, userType };

    try {
      const response = await axios.post(
        `${global.APIUrl}/user/register`,
        userReg
      );
      console.log(response);
      if (response.data.message !== "Email is Already Used") {

        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
          type: "success",
        }).then((okay) => {
          if (okay) {
            window.location.href = "/UserLogin";
          }
        });
      }
      else {
        Swal.fire({
          title: "Error!",
          text: "Email Already Taken",
          icon: "error",
          confirmButtonText: "OK",
          type: "success",
        });
        setTimeout(() => {
          window.location.href = "/UserRegistration";
        }, 3000);
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Registration Not Success",
        icon: "error",
        confirmButtonText: "OK",
        type: "success",
      });
      setTimeout(() => {
        window.location.href = "/UserRegistration";
      }, 3000);
    }
  }


  const setCPasswordFnction = (event) => {
    const ConfirmPassword = event;

    if ((ConfirmPassword === password) && (ConfirmPassword !== '') && (ConfirmPassword !== null)) {
      setIsValidCfpassword(true);
      setMessageCfpassword('Password Are Matching');

    } else {
      setIsValidCfpassword(false);
      setMessageCfpassword('Passwords Are Not Match');
    }
    setCPassword(event);
  };

  const registerBtn = () => {
    if ((firstName !== '') && (lastName !== '') && (email !== '') && (password !== '') && (CPassword !== '') && isValidCFpassword && isValidCFpassword2) {
      setRegistrationbtn(false)
    }
    else {
      setRegistrationbtn(true)
    }
  }

  useEffect(() => {
    registerBtn()
  }, [firstName, lastName, email, password, CPassword])

  return (
    <div>
      <Navbar />
      <MDBRow style={{ marginTop: '1%', width: '99%' }}>
        <MDBCol sm='1'></MDBCol>
        <MDBCol sm='6'>
          <MDBCard className="border-0 shadow-0">
            <MDBCardImage style={{  width: '100%', marginTop: '25%' }} position='top' alt='...' src='https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
          </MDBCard>
        </MDBCol>
        <MDBCol sm='5'>
          <MDBCard className="border-0 shadow-0 p-5">
            <MDBCardBody className="pt-5 mt-3 text-left">
              <div className="bg-light p-4">
                <center><h2 className="text-uppercase">Create Your Profile </h2></center>
                <br />
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">First Name</label>
                  <input type="text" class="form-control"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }} />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Last Name</label>
                  <input type="text" class="form-control"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }} />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Email</label>
                  <input type="text" class="form-control"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }} />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Password</label>
                  <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" onChange={(e) => {
                    setPasswordFunction(e.target.value);
                  }} />
                  <span style={{ fontSize: '12px', margin: '0px', padding: '0px' }} className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                    {messageStrongpassword}
                  </span>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Retype Password</label>
                  <input class="form-control" type={passwordShown ? "text" : "password"} id="pass" onChange={(e) => {
                    setCPasswordFnction(e.target.value);
                  }} />
                  <span style={{ fontSize: '12px', margin: '0px', padding: '0px' }} className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                    {messageCfpassword}
                  </span>
                </div>
                <div class="mt-3 mb-2">
                  <div class="d-grid gap-2">
                    <br />
                    <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" style={{ fontSize: "20px" }} disabled={Registrationbtn} onClick={Registration}>Register</MDBBtn>
                  </div>
                </div>
                <center>
                  <MDBRow >
                    <MDBCol size='5'></MDBCol>
                    <MDBCol size='5'></MDBCol>
                    <MDBCol size='2'><a href="/UserLogin" class="text-muted">Sing In</a></MDBCol>
                  </MDBRow>
                </center>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <Footer />
    </div>
  )
};

export default User_registration;