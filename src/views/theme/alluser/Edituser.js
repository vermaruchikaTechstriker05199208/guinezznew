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
// import {get_category_data,edit_category,get_category_data_byid,} from "../../../redux/categories/action";
import {get_user_data_byid,edit_user} from "../../../redux/user/action";
import { connect } from "react-redux";


class Edituser extends React.Component {

  constructor(props) {
    super(props);
    	this.state = {
      data: {}
 };
    this.formValidate = this.formValidate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = async () => {

    await this.props.get_user_data_byid(this.props.match.params.clientId);
    let selectedClient = this.props.user.update_user_id.data.user;
      await this.setState({
      data: selectedClient,
      id: this.props.match.params.clientId
    });
  }

  formValidate = () => {
    let { data, error } = this.state;
    let fieldList = [
      "first_name",
      "last_name",
      "email",
      "phone",
    ];
    let is_valid = true;
    for (let x of fieldList) {
      if (!data[x]) {
        is_valid = false;
        this.setState(prevState => ({
          error: { ...prevState.error, [x]: "Please fill in the above field" }
        }));
      }
    }
    return is_valid;
  };

  handleChange(event) {
    event.preventDefault();
    let data = this.state.data;
    let name = event.target.name;
    let value = event.target.value;

    data[name] = value;

    this.setState({data})
}


handleSubmit(event) {
  event.preventDefault();
   
    const { data, id } = this.state;
    if (!this.formValidate()) {
			return;
    }
		const payload = {
     id: data.id, 
     first_name:data.first_name,
     last_name:data.last_name,
     email:data.email,
     phone:data.phone
    };
    
    const sendData = JSON.stringify(payload);
    this.props
      .edit_user(payload)
      .then(async () => {
        this.props.history.push("/allusers");
        this.setState({
          isLogin: false
        });
      })
      .catch(err => {
        console.log("err", err);
      });
}
render() {

  const categorydata = this.props.category;
  const { data, errors } = this.state;
  return (
    <>
     <CCard>
            <CCardHeader>
              Edit User
              
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">First Name</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput  name="first_name"
                        id="first_name"
                        onChange={this.handleChange.bind(this)} 
                        value={data.first_name}
                       placeholder="Enter name" /> </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Last Name</CLabel>
                </CCol>
                 <CCol xs="12" md="9">
                <CInput  name="last_name"
                        id="last_name"
                        onChange={this.handleChange.bind(this)} 
                        value={data.last_name}
                       placeholder="Enter name" />
                   </CCol>
                 </CFormGroup>
              <CFormGroup row>
                  <CCol md="3">
                  <CLabel htmlFor="select">Email</CLabel>
                </CCol>
                 <CCol xs="12" md="9">
                <CInput 
					          	name="email"
                        id="email"
                        onChange={this.handleChange.bind(this)} 
                        value={data.email}
                        placeholder="Enter email" />
                     </CCol>
               </CFormGroup>
              <CFormGroup row>
               <CCol md="3">
                  <CLabel htmlFor="select">Phone</CLabel>
                </CCol>
                  <CCol xs="12" md="9">
                <CInput 
					          	name="phone"
                        id="phone"
                        onChange={this.handleChange.bind(this)} 
                        value={data.phone}
                        placeholder="Enter phone" />
                    </CCol>
               </CFormGroup>
     </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" 	  onClick={this.handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              
            </CCardFooter>
          </CCard>
  
    </>
  )
}
 }
const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps, { get_user_data_byid,get_user_data_byid,edit_user})(Edituser);