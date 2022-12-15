import './../App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom';

import {db} from './../firebase-config';
import {collection, getDocs} from 'firebase/firestore';
import { useAuth } from './auth';

function LogIn() {

  const [userList, setUserList] = useState([{}]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const userCollectionRef = collection(db, "user");

  auth.logout();

  useEffect(() =>{
    const getUser = async () => {
      const _data_ = await getDocs(userCollectionRef);
      setUserList(_data_.docs.map((doc) => ({ ...doc.data(), id:doc.id})));
    }

    getUser();
  },[])

  const user_data = userList.reduce((prevValue, { email, password }) => {
    prevValue[email] = typeof password === "string" ? JSON.parse(password) : password
    return prevValue;
}, {});

const emails = Object.keys(user_data)
const passwords = Object.values(user_data)

  const authenticateUser = async () => {

    for (let index = 0; index < emails.length; index++) {
      if(emails[index]===email){
        console.log(emails[index]);
        if(passwords[index]==password){
          auth.login(email);
          navigate('/', {replace:true});
        }
      }
    }
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
        <h5 className="card text-white bg-dark mb-5">Log In</h5>
        <span className="card-text">

          <input value={email} className="mb-2 form-control" onChange={event => setEmail(event.target.value)} placeholder="Email"/>
          <input type="password" value={password} className="mb-5 form-control" onChange={event => setPassword(event.target.value)} placeholder="Password"/>

          <button className="btn btn-outline-primary mx-2 mb-3" style={
          {'borderRadius':"50px", "font-weight":"bold"}} onClick={authenticateUser}>Log In</button>
          <br/>Don't Have an account <Link to='/signup'>Sign Up</Link>.
        </span>
      </div>
    </div>
  );
}

export default LogIn;