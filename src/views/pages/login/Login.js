import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { connect } from "react-redux";
import { do_login } from "../../../redux/auth/action";
import validators from '../../pages/validators';
// import Logoimage from "../images/logo.png";
import Logowhite from "../../../images/logo_white.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      sucsess: '',
      visible: true,
      isLogin: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.validators = validators;
    this.onInputChange = this.onInputChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.formValidators = this.formValidators.bind(this);
    
  }
  handleClick() {
    var elem = document.getElementById("loginform");
    elem.style.transition = "all 2s ease-in-out";
    elem.style.display = "none";
    document.getElementById("recoverform").style.display = "block";
  }
 
  formValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    if (fieldName == 'email') {
      this.validators[fieldName].rules.forEach(rule => {
        if (rule.test instanceof RegExp) {
          if (!rule.test.test(value)) {
            this.validators[fieldName].errors.push(rule.message);
            this.validators[fieldName].valid = false;
          }
        } else if (typeof rule.test === "function") {
          if (!rule.test(value)) {
            this.validators[fieldName].errors.push(rule.message);
            this.validators[fieldName].valid = false;
          }
        }
      });
    }
    if (fieldName == 'password') {
      this.validators[fieldName].rules.forEach(rule => {
        if (rule.test instanceof RegExp) {
          if (!rule.test.test(value)) {
            this.validators[fieldName].errors.push(rule.message);
            this.validators[fieldName].valid = false;
          }
        } else if (typeof rule.test === "function") {
          if (!rule.test(value)) {
            this.validators[fieldName].errors.push(rule.message);
            this.validators[fieldName].valid = false;
          }
        }
      });
    }
  }

  showErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return (
          <span className="error" key={index}>
            * {info}
            <br />
          </span>
        );
      });
      return <div className="error mb-2">{errors}</div>;
    }
    return result;
  }

  componentDidMount = async () => {
    // if (localStorage.getItem('user') && localStorage.getItem('user') != undefined) {
    //    this.props.history.push("/dashboard");
    // }
 
    if (localStorage.getItem('sendemail') !== undefined && localStorage.getItem('sendemail') !== "") {
      this.setState({
        sucsess: localStorage.getItem('sendemail')
      })
      localStorage.removeItem('sendemail')
    }
  }
  componentWillReceiveProps = async nextProps => {
    await this.setState({
      visible: !!nextProps.auth.error
    });
  };
	validForm() {
		let status = true;
		Object.keys(this.validators).forEach(field => {
			if (field === "email" || field === "password") {
				if (!this.validators[field].valid) {
					status = false;
				}
			}
		});
		return status;
	}
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.formValidators([event.target.name], event.target.value);
   
  }
  onDismiss() {
    this.setState({
      visible: false
    });
  }

  doLogin(event) {
    event.preventDefault();
    this.setState({
      isLogin: true
    });
    const { email, password } = this.state;
 

    this.props
      .do_login({ email, password })
      .then(async () => { 
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        	localStorage.setItem("email", email);
         const message = this.props.auth.user.status;
        {message ==200 ? this.props.history.push("/allusers") : this.props.history.push("/login");}


        this.setState({showMessage: true});
        this.setState({
          isLogin: false
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }



  
  render() {
   const message = this.props.auth.user.data;
   const { isLogin, sucsess } = this.state;

    return (
      
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div style={{color: "red"}} >  <h5>{this.state.showMessage && 'Invalid Login'}</h5></div>
                 
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      
                      <CInput type="email"   id="email"  name="email" value={this.state.email}   onChange={this.onInputChange}
                     placeholder="Email" autoComplete="username" />
                    </CInputGroup>
                    <div style={{color: "red"}}><h5>  {this.showErrors("email")}</h5></div>
                   
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                  
                      <CInput type="password" 
                          id="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onInputChange}
                          
                          placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <div style={{color: "red"}}><h5>  {this.showErrors("password")}</h5></div>
                  
                    <CRow>
                      <CCol xs="6">
                        
                        {/* <CButton color="primary" disabled={!this.validForm()}  onClick={this.doLogin} className="px-4">Login</CButton> */}

                        {!isLogin ? (
													<CButton
														color="primary"
														onClick={this.doLogin}
														size="lg"
														type="submit"

														disabled={!this.validForm()}
													>
														Log In
												</CButton>
												) : ''}
												{isLogin ? (
													<CButton
														color="primary"
														onClick={this.doLogin}
														size="lg"
														type="submit"
													
														disabled={isLogin}
													>
													
														Log In

													</CButton>
                       
												) : ''}
                       
 </CCol>

                   
                   
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={Logowhite}></img>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps, { do_login })(Login);