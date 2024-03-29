import './../App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../css/home.css';

import FormattedNumber from './formattedNumber';

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

let current_user = "unknown";
let current_address = "unknown";

function Home(){

  toast.success('Logged-in Successfully!!!', {
    position: "top-right",
    autoClose: 2000,
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

  useEffect(() =>{
    const getUser = async () => {
      //console.log("getting user data");
      const _data_ = await getDocs(userCollectionRef);
      setUserList(_data_.docs.map((doc) => ({ ...doc.data(), id:doc.id})));
      //console.log(userList);
    }

    getUser();
  }, [])

  const user_fdata = userList.reduce((prevValue, { elecAccNumber, fname}) => {
    prevValue[elecAccNumber] = typeof fname === "string" ? fname : fname
    return prevValue;
}, {});

const user_ldata = userList.reduce((prevValue, { elecAccNumber, lname }) => {
  prevValue[elecAccNumber] = typeof lname === "string" ? lname : lname
  return prevValue;
}, {});

const user_adddata = userList.reduce((prevValue, { elecAccNumber, address }) => {
  prevValue[elecAccNumber] = typeof address === "string" ? address : address
  return prevValue;
}, {});

  const elecAccNumbers = Object.keys(user_fdata)
  const userfnames = Object.values(user_fdata)
  const userlnames = Object.values(user_ldata)
  const useraddresses = Object.values(user_adddata)

  //console.log(useraddresses);

  for (let index = 0; index < elecAccNumbers.length; index++) {
    if(elecAccNumbers[index]===auth.user){
      current_user = userfnames[index] + " " + userlnames[index];
      current_address = useraddresses[index];
    }
  }

  //console.log("Current user elecAccNumber is " + auth.user);

  useEffect(() =>{
    const getEntry = async () => {
      const _data_ = await getDocs(entryCollectionRef);

      const filteredData = _data_.docs.filter(doc => {
        //console.log("Current user elecAccNumber is " + auth.user + " <---> " + doc.data().elecAccNumber)
        return doc.data().elecAccNumber === auth.user;
      });

      //console.log(filteredData);

      if (filteredData.length) {
        setEntryList(filteredData.map(doc => ({ ...doc.data(), id:doc.id})));
      }else{
        //console.log("No user data found!!!")
      }
    }
  
    getEntry();
  }, [])

  const output_max_voltage = entryList.reduce((prevValue, { date, DayMaxVoltage }) => {
    prevValue[date] = typeof DayMaxVoltage === "string" ? JSON.parse(DayMaxVoltage) : DayMaxVoltage
    return prevValue;
}, {});

const maxVoltage = Math.max(...Object.values(output_max_voltage));

const output_min_voltage = entryList.reduce((prevValue, { date, DayMinVoltage }) => {
  prevValue[date] = typeof DayMinVoltage === "string" ? JSON.parse(DayMinVoltage) : DayMinVoltage
  return prevValue;
}, {});

const minVoltage = Math.max(...Object.values(output_min_voltage));

const output_tot_real_power = entryList.reduce((prevValue, { date, DayTotRealPower }) => {
  prevValue[date] = typeof DayTotRealPower === "string" ? JSON.parse(DayTotRealPower) : DayTotRealPower
  return prevValue;
}, {});

const output_tot_apperent_power = entryList.reduce((prevValue, { date, DaytotapparentPower }) => {
  prevValue[date] = typeof DaytotapparentPower === "string" ? JSON.parse(DaytotapparentPower) : DaytotapparentPower
  return prevValue;
}, {});

let keys = Object.keys(output_tot_real_power);
keys.sort((a, b) => {
  let dateA = new Date(a);
  let dateB = new Date(b);
  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
});
let lastIndex = keys.length - 1;
let last_real_day_key = keys[0];
let current_real_day_value = output_tot_real_power[last_real_day_key];

keys = Object.keys(output_tot_apperent_power);

keys.sort((a, b) => {
  let dateA = new Date(a);
  let dateB = new Date(b);
  if (dateA > dateB) return -1;
  if (dateA < dateB) return 1;
  return 0;
});

lastIndex = keys.length - 1;
let last_app_day_key = keys[0];
let current_app_day_value = output_tot_apperent_power[last_app_day_key];

//console.log("real power: " + last_real_day_key + "=>" + current_real_day_value)
//console.log("apperent power: " + last_app_day_key + "=>" + current_app_day_value)

const output_tot_real_power_values = Object.values(output_tot_real_power);
const output_tot_real_power_sum = output_tot_real_power_values.reduce((a, b) => a + b, 0);
//const output_tot_real_power_average = output_tot_real_power_sum / output_tot_real_power_values.length;

const output_tot_apperent_power_values = Object.values(output_max_voltage);
const output_tot_apperent_power_sum = output_tot_apperent_power_values.reduce((a, b) => a + b, 0);
//const output_tot_apperent_power_average = output_tot_apperent_power_sum / output_tot_apperent_power_values.length;

let price;

if(output_tot_real_power_sum>60){
  if(output_tot_real_power_sum>180){
    price = (75*output_tot_real_power_sum)+1500;
  }else if(output_tot_real_power_sum>120){
    price = (50*output_tot_real_power_sum)+960;
  }else if(output_tot_real_power_sum>90){
    price = (50*output_tot_real_power_sum)+960;
  }else if(output_tot_real_power_sum>60){
    price = (16*output_tot_real_power_sum)+360;
  }else if(output_tot_real_power_sum>0){
    price = (16*output_tot_real_power_sum);
  }
}else{
  if(output_tot_real_power_sum>30){
    price = (10*output_tot_real_power_sum)+240;
  }else if(output_tot_real_power_sum>0){
    price = (8*output_tot_real_power_sum)+120;
  }
}

const lastTenDates = Object.keys(output_max_voltage).sort().slice(-6);
const tot_real_pow_data={
  labels: lastTenDates,
  datasets: [
    {
      label: 'Total Real Power',
      data: lastTenDates.map(date => output_tot_real_power[date]),
      backgroundColor: 'aqua',
      borderColor: 'black',
      borderWidth: 1,
    },
  ]
};


  const latestDates = Object.keys(output_max_voltage).sort().slice(-6);
  const tot_appr_pow_data={
    labels: latestDates,
    datasets: [
      {
        label: 'Total Apparent Power',
        data: latestDates.map(date => output_tot_apperent_power[date]),
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
      },
    ]
  };
  

  const options={

  };

  const handleLogout = () =>{
    current_user = "unknown";
    current_address = "unknown";
    auth.logout();
    navigate('login');
  }

  return(
    <div className='App list-group-item justify-content-center
    aligh-items-center mx-auto' style={{"width":"80%",
    "backgroundColor":"white", "marginTop":"15px"}}>
      <h1>Advanced Energy Monitoring System</h1>
      <hr/>
        <h3 className='user-data'><b>Name: </b>{current_user}</h3>
        <h3 className='user-data'><b>Acc No: </b>{auth.user}</h3>
        <h3 className='user-data'><b>Address: </b>{current_address}</h3>
        <button onClick={handleLogout} className="mb-5">Logout</button>
      <center>  
        <div style={
              {padding: '20px', backgroundColor:'#f2f2f2', borderRadius:"15px"}
            }>
          <h3>Daily Energy Consumption</h3>
          <Bar
            data={tot_real_pow_data}
            options={options}
            className="mb-4"
          ></Bar>
        </div>
        <br/>
        <div style={
              {padding: '20px', backgroundColor:'#f2f2f2', borderRadius:"15px"}
            }>
          <h3>Daily Apperent Power Consumption</h3>
            <Bar
            data={tot_appr_pow_data}
            options={options}
            className="mb-4"
          ></Bar>
        </div>
        <br/>
        </center>
        <h4 className='user-data'>{"Daily Avg PF: " + (Math.cos(current_app_day_value/current_real_day_value)).toFixed(2) + ""}</h4>
        <h4 className='user-data'>{"Daily Minimum Voltage: " + minVoltage + ""}</h4>
        <h4 className='user-data'>{"Daily Maximum Voltage: " + maxVoltage + ""}</h4>
        <h4 className='user-data'> Price For Current Usage: <FormattedNumber value={price} /></h4>
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