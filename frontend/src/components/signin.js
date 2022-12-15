import './../App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom';

import {db} from './../firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import { useAuth } from './auth';

function SignUp() {

  const navigate = useNavigate();
  const auth = useAuth();

  auth.logout();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const userCollectionRef = collection(db, "user");

  const signupUser = async () => {
    await addDoc(userCollectionRef, {email: email, fname: firstName, lname: lastName, uname: userName, password: password});

    navigate('/login');
  };

  return (
    <div className='App list-group-item justify-content-center
    aligh-items-center mx-auto' style={{"width":"600px",
    "backgroundColor":"white", "marginTop":"15px"}}>
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
          <input value={userName} className="mb-2 form-control" onChange={event => setUserName(event.target.value)} placeholder="User Name"/>
          <input type="password" value={password} className="mb-5 form-control" onChange={event => setPassword(event.target.value)} placeholder="Password"/>

          <button className="btn btn-outline-primary mx-2 mb-3" style={
          {'borderRadius':"50px", "font-weight":"bold"}} onClick={signupUser}>Sign Up</button>
          <br/>Already Have an account <Link to='/login'>Login</Link>.
        </span>
      </div>
    </div>
  );
}

export default SignUp;