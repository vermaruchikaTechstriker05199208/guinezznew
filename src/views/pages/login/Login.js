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
  CRow,
  CLabel

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { do_login } from "../../../redux/auth/action";
import { toast } from 'react-toastify';
import validators from '../../pages/validators';
// import Logoimage from "../images/logo.png";
import Logowhite from "../../../images/logo_white.png";

class Login extends React.Component {
  constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
      email: "",
      password: "",
	        data: {},
			errors: {}
		};
	}
  componentDidMount = async () => {

    // if (localStorage.getItem('user') && localStorage.getItem('user') != undefined) {
    //    this.props.history.push("/allusers");
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
  formValidate = () => {
		let { data } = this.state;
		let fieldList = [

    "email",
    "password",

    
		];
	
		let is_valid = true;
		for (let x of fieldList) {
			if (!data[x]) {
				is_valid = false;
				this.setState(prevState => ({
					errors: { ...prevState.errors, [x]: "Please fill in the above field" }
				}));
            }
            if (data["email"]) {
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regex.test(String(data["email"]).toLowerCase())) {
                    is_valid = false;
                    this.setState(prevState => ({
                        errors: {
                            ...prevState.errors,
                            email: "Please fill in correct email address"
                        }
                    }));
                }
            }
          
            if(data['password'] != "" && data['password'] != undefined){
                var regularExpression = /^(?=.*\d).{8,20}$/;
                if(!regularExpression.test(data['password'])){
                    is_valid = false;
                    this.setState(prevState => ({
                        errors: {
                            ...prevState.errors,
                            password: "Your password should be at least 8 characters long"
                        }
                    }));	
                }
            }
           
		}
return is_valid;
	};

	onChange = async e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value },
			errors: { ...this.state.errors, [e.target.name]: "" }
		});
		if (!e.target.value) {
			this.setState({
				errors: {
					...this.state.errors,
					[e.target.name]: "Please fill in the above field"
				}
			});
		}

	};

	async handleSubmit(event) {
    const {isAdded} = this.props.user;
		event.preventDefault();
    if (!this.formValidate()) {
			return;
		}
    const {email,password} = this.state;
    const { data } = this.state;
  
		const payload = {
      password:data.password,
       email:data.email,
	  
    };
console.log(payload,'payload')
 await this.props
    .do_login(payload)
    .then(async () => { 
      var user = localStorage.getItem('user');
     
      user = JSON.parse(user);
        localStorage.setItem("email", email);
       const message = this.props.auth.user.status;
       console.log(message,'status')
      {message ==200 ? this.props.history.push("/allusers") : this.props.history.push("/login")}
    
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
   const { isLogin, sucsess ,errors} = this.state;
   const { data} = this.state;
   let token = localStorage.getItem("accessToken");
   const messagenew = this.props.auth.user.status;
     

  
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
                     
                      <CInput type="email"   id="email"  name="email"  value={data.email}  invalid={!!errors.email}  onChange={this.onChange}
                     placeholder="Email" required autoComplete="username" />
                    </CInputGroup>
                
                    {errors.email ? (
										<CLabel className="is-invalid text-danger">
											{errors.email}
										</CLabel>
									) : (
										""
									)}
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                  
                      <CInput 
                          type="password" 
                          id="password"
                          name="password"
                          invalid={!!errors.password}
                          value={data.password}
                          onChange={this.onChange}
                          placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    {errors.password ? (
										<CLabel className="is-invalid text-danger">
											{errors.password}
										</CLabel>
									) : (
										""
									)}
                
                    <CRow>
                      <CCol xs="6">
                      
                     <CButton type="submit" 		onClick={this.handleSubmit}  size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>   
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