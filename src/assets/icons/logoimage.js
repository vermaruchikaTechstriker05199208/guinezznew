

import React from "react"

import logo from './../../images/logo.png';
class Logoimage extends React.Component {
	render() {
		return (
			<div> 
				<center>
					<img src= {logo} alt="pic" />
					<br/> <b> CONGRATS </b>
				</center>
			</div>
		)
	}
}
export default Logoimage