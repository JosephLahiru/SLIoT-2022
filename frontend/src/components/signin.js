import './../App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom';

import {db} from './../firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import { useAuth } from './auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../css/signin.css';

function SendToast(message){
  toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
}

function SignUp() {

  const navigate = useNavigate();
  const auth = useAuth();

  auth.logout();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nidNumber, setNIDNumber] = useState('');
  const [password, setPassword] = useState('');
  const [elecAccNumber, setelecAccNumber] = useState('');
  const [address, setAddress] = useState('');

  const userCollectionRef = collection(db, "user");

  function isValidEmail(email) {
    return(/\S+@\S+\.\S+/.test(email));
  }

  function isValidNID(idCardNumber) {
    if (idCardNumber.length !== 10) {
      return false;
    }
    if (!/^[1-9]/.test(idCardNumber)) {
      return false;
    }
    const gender = idCardNumber.charAt(9);

    if (isNaN(idCardNumber.substr(0, 9))) {
      return false;
    }

    if (gender !== "V" && gender !== "X") {
      return false;
    }
    return true;
  }

  const signupUser = async () => {
    if(email.length === 0){
      SendToast('Email cannot be empty!!!');
    }else if(isValidEmail(email) === false){
      SendToast('Please enter a valid Email!!!');
    }else if(firstName.length === 0){
      SendToast('First Name cannot be empty!!!');
    }else if(lastName.length === 0){
      SendToast('Last Name cannot be empty!!!');
    }else if(address.length === 0){
      SendToast('Address cannot be empty!!!');
    }else if(isValidNID(nidNumber) === false){
      SendToast('Please enter a valid NID Number!!!');
    }else if(nidNumber.length === 0){
      SendToast('NID Number cannot be empty!!!');
    }else if(elecAccNumber.length === 0){
      SendToast('Electronic Account Number cannot be empty!!!');
    }else if(elecAccNumber.length !== 10 || isNaN(elecAccNumber)){
      SendToast('Please enter a valid Electronic Account Number!!!');
    }else if(password.length === 0){
      SendToast('Please enter a valid Electronic Account Number!!!');
    }else{
      await addDoc(userCollectionRef, {email: email, fname: firstName, lname: lastName, nidnum: nidNumber, elecAccNumber: elecAccNumber, password: password, address: address});
      navigate('/login');
    }
  };

  return (
    <div className='App list-group-item justify-content-center
    aligh-items-center mx-auto main_panel'>
      <h1 className="card text-white bg-info mb-1"
      styleName="max-width: 20rem;">ELECTRO APP</h1>
      <h6 className="card text-white bg-info mb-3">
        TEAM METATRON</h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-5">Sign Up</h5>
        <span className="card-text">

          <input value={email} className="mb-2 form-control" onChange={event => setEmail(event.target.value)} placeholder="Email"/>
          <input value={firstName} className="mb-2 form-control" onChange={event => setFirstName(event.target.value)} placeholder="First Name"/>
          <input value={lastName} className="mb-2 form-control" onChange={event => setLastName(event.target.value)} placeholder="Last Name"/>
          <input value={address} className="mb-2 form-control" onChange={event => setAddress(event.target.value)} placeholder="Address"/>
          <input value={nidNumber} className="mb-2 form-control" onChange={event => setNIDNumber(event.target.value)} placeholder="National ID Card Number"/>
          <input value={elecAccNumber} className="mb-2 form-control" onChange={event => setelecAccNumber(event.target.value)} placeholder="Electronic Account Number"/>
          <input type="password" value={password} className="mb-5 form-control" onChange={event => setPassword(event.target.value)} placeholder="Password"/>

          <button className="btn btn-outline-primary mx-2 mb-3" style={
          {'borderRadius':"50px", "font-weight":"bold"}} onClick={signupUser}>Sign Up</button>
          <br/>Already Have an account? <Link to='/login'>Login</Link>.
        </span>
        <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp;