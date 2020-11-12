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
  CInput,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {create_business} from "../../../redux/allbuisness/action";
import {get_category_data,get_subcategory_data_byid} from "../../../redux/categories/action";
import { connect } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

class Addbuisness extends React.Component {

  constructor(props) {
		super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
	        data: {},
      errors: {},
      latitude: '',
      longitude: '',
      hideocategory:false,
    };
    this.getMyLocation = this.getMyLocation.bind(this)
	}
  componentDidMount = async () => {
    await this.props.get_category_data()
    this.getMyLocation()
   
  }
  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-logitude' })
      })
    }

  }

  formValidate = () => {
		let { data } = this.state;
		let fieldList = [
    "name",
    "phone",
    "email",
    "address",
    "latitude",
    "logitude",
    "closing_day",
    "closing_hours",
    "dm",
    "home_delivery",
    "opening_day",
    "opening_hours",
    "phone_call",
    "services_description",
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
          	}
return is_valid;
	};


  onClick = async e =>{
    let parentCatID = e.target.value;
   
    this.props.get_subcategory_data_byid(parentCatID);
  }
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
	handleClick() {
   
    this.setState({hideocategory:true })

	}
	async handleSubmit(event) {
    const {isAdded} = this.props.user;
		event.preventDefault();

		const { data,latitude,longitude } = this.state;
    const business = this.props.allbuisness.create_buisness.status;
  
		const payload = {
      name: data.name,
     phone:data.phone,
      email:data.email,
      address:data.address,
      latitude:latitude,
      logitude:longitude,
      closing_day:data.closing_day,
      closing_hours:data.closing_hours,
      dm:data.dm,
      home_delivery:data.home_delivery,
      opening_day:data.opening_day,
      opening_hours:data.opening_hours,
      phone_call:data.phone_call,
      services_description:data.services_description,

      cat_id:data.cat_id,
      subcat_id:data.subcat_id
   
    };

    await this.props.create_business(payload);
   {business === 201  ?  toast.success("Buisness added sucessfully.") :  toast.success("invalid data")}
	}


  render() {
  const subcategory = this.props.category.subcategoryid_list.categories;
  const categorydata = this.props.category.category_list.categories;
 const { data, errors, latitude, longitude } = this.state;
return (
 <>
 <CCard>
   <CCardHeader>
              Add Buisness 
          </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Category Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    
                    <CSelect custom name="cat_id" id="cat_id"  invalid={!!errors.cat_id}   
                    onChange={this.onChange}  onClick={this.onClick} value= {data.cat_id}>
                    <option  hidden={this.state.hideocategory}  value={0}> choose a category </option>
                    {categorydata !== undefined ? categorydata.map((category, index) => (
                      <option value={category.id}>  {category.name}  </option>
    )) : ""}
                    </CSelect>
                    {errors.parent_id ? (
										<CLabel className="is-invalid text-danger">
											{errors.parent_id}
										</CLabel>
									) : (
										""
									)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Subategory  Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    
                    <CSelect custom name="subcat_id" id="subcat_id"  invalid={!!errors.subcat_id}
                   
                    onChange={this.onChange} value= {data.subcat_id}>
                    <option  value={0}> choose a subcategory </option>
                    {subcategory !== undefined ? subcategory.map((category, index) => (
                    <option value={category.id}>  {category.name}  </option>)) : ""}
                    </CSelect>
                    {errors.parent_id ? (
										<CLabel className="is-invalid text-danger">
											{errors.parent_id}
										</CLabel>
									) : (
										""
									)}
                  </CCol>
                </CFormGroup>
              <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select"> Name</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput 
					             name="name"
                        id="name"
                        onChange={this.onChange}
                        value={data.name}
                        invalid={!!errors.name}
											  placeholder="Enter user name" />
                        {errors.name ? (
										<CLabel className="is-invalid text-danger">
											{errors.name}
										</CLabel>
									) : (
										""
									)}
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
                        onChange={this.onChange}
                        value={data.phone}
                        invalid={!!errors.phone}
					            	placeholder="Enter phone number" />
                   {errors.phone ? (
				 <CLabel className="is-invalid text-danger">
											{errors.phone}
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
                    <CLabel htmlFor="textarea-input">address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      name="address" 
                      id="address" 
                      rows="9"
                      value={data.address}
                      onChange={this.onChange}
                      invalid={!!errors.address}
                      placeholder="Enter Email" 
                    />
                      {errors.address ? (
					<CLabel className="is-invalid text-danger">
											{errors.address}
										</CLabel>
									) : (
										""
									)}
                  </CCol>
                </CFormGroup>
           
            
                <CRow>
                <CCol xs="6">
                <CFormGroup >
               
                    <CLabel htmlFor="textarea-input">latitude</CLabel>
                
             
                    <CInput 
                      name="latitude" 
                      
                      id="latitude" 
                      rows="9"
                      value={latitude}
                      onChange={this.onChange}
                     
                      placeholder="Enter Email" 
                    />
               
           
                </CFormGroup>

                </CCol>
                <CCol xs="6">

                <CFormGroup row>
            
                    <CLabel htmlFor="textarea-input">longitude</CLabel>
            
              
                    <CInput 
                      name="longitude" 
                      
                      id="longitude" 
                      rows="9"
                      value={longitude}
                       onChange={this.onChange}
                     
                      placeholder="Enter Email" 
                    />
                  
               
                </CFormGroup>
                </CCol>
                </CRow>
                <CRow>
                <CCol xs="3">
                <CFormGroup >
                  
                    <CLabel htmlFor="textarea-input">closing_day</CLabel>
                
                  
                    <CInput 
                      name="closing_day" 
                      type="date"
                      id="closing_day" 
                      rows="9"
                      value={data.closing_day}
                      onChange={this.onChange}
                      invalid={!!errors.closing_day}
                      placeholder="Enter Email" 
                    />
                      {errors.closing_day ? (
					<CLabel className="is-invalid text-danger">
											{errors.closing_day}
										</CLabel>
									) : (
										""
									)}
                
                </CFormGroup>
                </CCol>
                <CCol xs="3">
                <CFormGroup>
               
                    <CLabel htmlFor="textarea-input">closing hours</CLabel>
                 
               
                    <CInput 
                      name="closing_hours" 
                      type="time"
                      id="closing_hours" 
                      rows="9"
                      value={data.closing_hours}
                      onChange={this.onChange}
                      invalid={!!errors.closing_hours}
                      placeholder="Enter Email" 
                    />
                      {errors.closing_hours ? (
					<CLabel className="is-invalid text-danger">
											{errors.closing_hours}
										</CLabel>
									) : (
										""
									)}
                
                </CFormGroup>
                </CCol>
                <CCol xs="3">
                <CFormGroup >
                 
                    <CLabel htmlFor="textarea-input">opening day</CLabel>
                
            
                    <CInput 
                      name="opening_day" 
                      type="date"
                      id="opening_day" 
                      rows="9"
                      value={data.opening_day}
                      onChange={this.onChange}
                      invalid={!!errors.opening_day}
                      placeholder="Opening day" 
                    />
                      {errors.opening_day ? (
					<CLabel className="is-invalid text-danger">
											{errors.opening_day}
										</CLabel>
									) : (
										""
									)}
           
                </CFormGroup>
                </CCol>
                <CCol xs="3">
                <CFormGroup >
                
                    <CLabel htmlFor="textarea-input">opening hours</CLabel>
                
              
                    <CInput 
                      name="opening_hours" 
                      type="time"
                      id="opening_hours" 
                      rows="9"
                      value={data.opening_hours}
                      onChange={this.onChange}
                      invalid={!!errors.opening_hours}
                      placeholder="Opening Hours" 
                    />
                      {errors.opening_hours ? (
					<CLabel className="is-invalid text-danger">
											{errors.opening_hours}
										</CLabel>
									) : (
										""
									)}
         
                </CFormGroup>
                </CCol>
                </CRow>
               
               
                <CRow>
                <CCol xs="4">
                <CFormGroup>
                 
                    <CLabel htmlFor="textarea-input">Dm </CLabel>
                
                 
                  <CSelect  name="dm"  id="dm"   onChange={this.onChange} value={data.dm}   onChange={this.onChange}
                     invalid={!!errors.dm}   >
                      <option  value={0} >true</option>
                      <option value={1}>false</option>
                      
                    </CSelect>
                      {errors.dm ? (
					<CLabel className="is-invalid text-danger">
											{errors.dm}
										</CLabel>
									) : (
										""
									)}
                 
                </CFormGroup>
                </CCol >
                <CCol xs="4">
                <CFormGroup >
                  
                    <CLabel htmlFor="textarea-input">home_delivery </CLabel>
                
                 
                  <CSelect  name="home_delivery"  id="home_delivery"   onChange={this.onChange} value={data.home_delivery}   onChange={this.onChange}
                     invalid={!!errors.home_delivery}   >
                      <option  value={0} >true</option>
                      <option value={1}>false</option>
                      
                    </CSelect>
                      {errors.home_delivery ? (
					<CLabel className="is-invalid text-danger">
											{errors.home_delivery}
										</CLabel>
									) : (
										""
									)}
                
                </CFormGroup>
                </CCol >
                <CCol xs="4">
                <CFormGroup>
                 
                    <CLabel htmlFor="textarea-input">Phone call </CLabel>
                 
                  
                  <CSelect  name="phone_call"  id="phone_call"   onChange={this.onChange} value={data.phone_call}   onChange={this.onChange}
                     invalid={!!errors.phone_call}   >
                      <option  value={0} >true</option>
                      <option value={1}>false</option>
                      
                    </CSelect>
                      {errors.phone_call ? (
					<CLabel className="is-invalid text-danger">
											{errors.phone_call}
										</CLabel>
									) : (
										""
									)}
                 
                </CFormGroup>
                </CCol >
                </CRow>
           
           
      
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Services description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput 
                      name="services_description" 
                      fieldName
                      id="services_description" 
                      rows="9"
                      value={data.services_description}
                      onChange={this.onChange}
                      invalid={!!errors.services_description}
                      placeholder="service description" 
                    />
                      {errors.services_description ? (
					<CLabel className="is-invalid text-danger">
											{errors.services_description}
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
export default connect(mapStateToProps, { get_category_data,create_business,get_subcategory_data_byid})(Addbuisness);