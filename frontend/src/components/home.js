import './../App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

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

  const [entryList, setEntryList] = useState([{}]);

  const entryCollectionRef = collection(db, "entry");

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() =>{
    const getEntry = async () => {
      const _data_ = await getDocs(entryCollectionRef);
      setEntryList(_data_.docs.map((doc) => ({ ...doc.data(), id:doc.id})));
    }

    getEntry();
  })

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
      <h1>ELECTRO APP</h1>
        <h3>Welcome {auth.user}</h3>
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
    </div>
  )
}

export default Home;