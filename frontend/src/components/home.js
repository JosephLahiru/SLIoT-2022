import './../App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import {Bar} from 'react-chartjs-2';

import {db} from './../firebase-config';
import {collection, getDocs} from 'firebase/firestore';
import { useAuth } from './auth';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

function Home(){

  toast.success('Logged-in Successfully!!!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const [entryList, setEntryList] = useState([{}]);
  const [userList, setUserList] = useState([{}]);

  const entryCollectionRef = collection(db, "entry");
  const userCollectionRef = collection(db, "user");

  const auth = useAuth();
  const navigate = useNavigate();

  // useEffect(() =>{
  //   const showSuccess = () => {
  //     toast.success('Logged-in Successfully!!!', {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  //   showSuccess();
  // }, [])

  useEffect(() =>{
    const getEntry = async () => {
      const _data_ = await getDocs(entryCollectionRef);
      setEntryList(_data_.docs.map((doc) => ({ ...doc.data(), id:doc.id})));
    }

    getEntry();
  }, 5000)

  useEffect(() =>{
    const getUser = async () => {
      const _data_ = await getDocs(userCollectionRef);
      setUserList(_data_.docs.map((doc) => ({ ...doc.data(), id:doc.id})));
    }

    getUser();
  }, 5000)

  // console.log(userList)

  const user_fdata = userList.reduce((prevValue, { elecAccNumber, fname}) => {
    prevValue[elecAccNumber] = typeof fname === "string" ? fname : fname
    return prevValue;
}, {});

const user_ldata = userList.reduce((prevValue, { elecAccNumber, lname }) => {
  prevValue[elecAccNumber] = typeof lname === "string" ? lname : lname
  return prevValue;
}, {});

  let current_user = "unknown";

  const elecAccNumbers = Object.keys(user_fdata)
  const userfnames = Object.values(user_fdata)
  const userlnames = Object.values(user_ldata)

  for (let index = 0; index < elecAccNumbers.length; index++) {
    if(elecAccNumbers[index]===auth.user){
      current_user = userfnames[index] + " " + userlnames[index];
      // console.log("Current user is " + usernames[index])
    }
  }

  const output_max_voltage = entryList.reduce((prevValue, { date, DayMaxVoltage }) => {
    prevValue[date] = typeof DayMaxVoltage === "string" ? JSON.parse(DayMaxVoltage) : DayMaxVoltage
    return prevValue;
}, {});

const output_tot_power = entryList.reduce((prevValue, { date, DayTotPower }) => {
  prevValue[date] = typeof DayTotPower === "string" ? JSON.parse(DayTotPower) : DayTotPower
  return prevValue;
}, {});

const power_factor = entryList.reduce((prevValue, { date, powerFactor }) => {
  prevValue[date] = typeof powerFactor === "string" ? JSON.parse(powerFactor) : powerFactor
  return prevValue;
}, {});

  const max_vol_data={
    labels: Object.keys(output_max_voltage),
    datasets: [
      {
        label: 'Max Voltage',
        data: Object.values(output_max_voltage),
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      }
    ]
  };

  const tot_pow_data={
    labels: Object.keys(output_max_voltage),
    datasets: [
      {
        label: 'Total Power',
        data: Object.values(output_tot_power),
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
      },
    ]
  };

  const pow_fac_data={
    labels: Object.keys(output_max_voltage),
    datasets: [
      {
        label: 'Power Factor',
        data: Object.values(power_factor),
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 1,
      }
    ]
  };

  const options={

  };

  const handleLogout = () =>{
    auth.logout();
    navigate('login');
  }

  return(
    <div className='App list-group-item justify-content-center
    aligh-items-center mx-auto' style={{"width":"70%",
    "backgroundColor":"white", "marginTop":"15px"}}>
      <h1>Advanced Energy Monitoring System</h1>
      <hr/>
        <h3>Welcome {current_user}</h3>
        <h4>{"Electric Account Number: " + auth.user + ""}</h4>
        <button onClick={handleLogout} className="mb-5">Logout</button>
      <center>  
        <div style={
              {padding: '20px'}
            }>
          <h3>Max Voltage</h3>
          <Bar
            data={max_vol_data}
            options={options}
            className="mb-4"
          ></Bar>
          <h3>Total Power</h3>
            <Bar
            data={tot_pow_data}
            options={options}
            className="mb-4"
          ></Bar>
          <h3>Power Factor</h3>
            <Bar
            data={pow_fac_data}
            options={options}
            className="mb-4"
          ></Bar>
        </div>
      </center>
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
  )
}

export default Home;