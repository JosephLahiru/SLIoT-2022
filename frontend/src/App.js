import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import {Bar} from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

function App(){

  const [entryList, setEntryList] = useState([{}])

  useEffect(() => {
    axios.get('http://localhost:8000/api/entry')
    .then(res =>{
      setEntryList(res.data)
    })
  });

  const output = entryList.reduce((prevValue, { date, value }) => {
    prevValue[date] = typeof value === "string" ? JSON.parse(value) : value
    return prevValue;
}, {});

console.log(output);

  const data={
    labels: Object.keys(output),
    datasets: [
      {
        label: 'Electricity Usage',
        data: Object.values(output),
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      }
    ]
  };

  const options={

  };

  return(
    <div className='App'>
      <h1>Hello World</h1>
      <center>
        <div style={
              {padding: '20px', width: '70%'}
            }>
          <Bar
            data={data}
            options={options}
          ></Bar>
        </div>
      </center>
    </div>
  )
}

export default App;