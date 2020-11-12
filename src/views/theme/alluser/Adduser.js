import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CLabel,
  CSelect,
  CInput
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {create_category,get_category_data} from "../../../redux/categories/action";
import {register_user} from "../../../redux/user/action";
import { connect } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

class AddUser extends React.Component {

  constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
	        data: {},
			errors: {}
		};
	}

  formValidate = () => {
		let { data } = this.state;
		let fieldList = [
    "first_name",
    "last_name",
    "email",
    "password",
    "phone",
    "password_confirmation"
    
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
            if(data['password_confirmation'] == "" || data['password_confirmation'] == undefined){
                is_valid = false;
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        confirm: "Please fill in the above field"
                    }
                }));
            }else if(data["password"] !== data["password_confirmation"]){
                is_valid = false;
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        confirm: "Password & Confirm Password do not match"
                    }
                }));
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
		const { data } = this.state;
  
		const payload = {
      first_name: data.first_name,
      last_name:data.last_name,
      password:data.password,
      password_confirmation:data.password_confirmation,
      email:data.email,
	    phone:data.phone
    };

    await this.props.register_user(payload);
    toast.success("registered");

	}


  render() {
  const usersdata = this.props.user;
  

  const { data, errors } = this.state;
 

  return (
    <>
     <CCard>
            <CCardHeader>
              Add User
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
         
              <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">First Name</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput 
					    name="first_name"
                        id="first_name"
                        onChange={this.onChange}
                        value={data.first_name}
                        invalid={!!errors.first_name}
											  placeholder="Enter First Name" />
                   {errors.first_name ? (
										<CLabel className="is-invalid text-danger">
											{errors.first_name}
										</CLabel>
									) : (
										""
									)}
                </CCol>
               
              </CFormGroup>
              <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">Last Name</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput 
					    name="last_name"
                        id="last_name"
                        onChange={this.onChange}
                        value={data.last_name}
                        invalid={!!errors.last_name}
											  placeholder="Enter last name" />
                   {errors.last_name ? (
										<CLabel className="is-invalid text-danger">
											{errors.last_name}
										</CLabel>
									) : (
										""
									)}
                </CCol>
               
              </CFormGroup>
              <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">Password</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput 
                        name="password"
                        type="password"
                        id="password"
                        onChange={this.onChange}
                        value={data.password}
                        invalid={!!errors.password}
											  placeholder=" Password" />
                   {errors.password ? (
										<CLabel className="is-invalid text-danger">
											{errors.password}
										</CLabel>
									) : (
										""
									)}
                </CCol>
               
              </CFormGroup>
              <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">Confirm Password</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput 
                        name="password_confirmation"
                        type="password"
                        id="password_confirmation"
                        onChange={this.onChange}
                        value={data.password_confirmation}
                        invalid={!!errors.password_confirmation}
											  placeholder="Confirm Password" />
                   {errors.password_confirmation ? (
										<CLabel className="is-invalid text-danger">
											{errors.password_confirmation}
										</CLabel>
									) : (
										""
									)}
                </CCol>
               
              </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      name="email" 
                      id="email" 
                      rows="9"
                      value={data.email}
                      onChange={this.onChange}
                      invalid={!!errors.email}
                      placeholder="Enter Email" 
                    />
                      {errors.email ? (
										<CLabel className="is-invalid text-danger">
											{errors.email}
										</CLabel>
									) : (
										""
									)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Phone</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      name="phone" 
                      id="phone" 
                      rows="9"
                      value={data.phone}
                      onChange={this.onChange}
                      invalid={!!errors.phone}
                      placeholder="Enter Phone number" 
                    />
                      {errors.email ? (
										<CLabel className="is-invalid text-danger">
											{errors.phone}
										</CLabel>
									) : (
										""
									)}
                  </CCol>
                </CFormGroup>
     </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" 	onClick={this.handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
            
            </CCardFooter>
          </CCard>
          <ToastContainer hideProgressBar={true} />
    </>
  )
}
 }


const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps, { create_category,get_category_data,register_user })(AddUser);