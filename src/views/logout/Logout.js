import React from 'react'
import {
 CRow,
 } from '@coreui/react'
 import { Redirect } from 'react-router-dom';
class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.state = {
 
      isLogin: localStorage.getItem('isLogin') ? true : false,
    
 
    };
  }
  componentDidMount = async () => {
   
 this.logOut();
  }


  logOut = () => {
    
    localStorage.clear();
    this.setState({
      isLogin: false
    })

  }
     render(){

      if (this.state.isLogin === false) {
     
        return <Redirect to='/login' />
      }
   
   return (
    <>
 

    </>
  )
}
  }



export default Logout;
