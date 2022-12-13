import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from './components/canvasjs.react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

 
class App extends Component {	
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark1",
			title:{
				text: "Simple Column Chart with Index Labels"
			},
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column",
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: [
					{ x: 10, y: 71 },
					{ x: 20, y: 55 },
					{ x: 30, y: 50 },
					{ x: 40, y: 65 },
					{ x: 50, y: 71 },
					{ x: 60, y: 68 },
					{ x: 70, y: 38 },
					{ x: 80, y: 92},
				]
			}]
		}
		
		return (
		<div className='App list-group-item justify-content-center
    aligh-items-center mx-auto' style={{"width":"70%",
    "backgroundColor":"white", "marginTop":"15px"}}>
			<CanvasJSChart options = {options}
			/>
		</div>
		);
	}
}
 
export default App;