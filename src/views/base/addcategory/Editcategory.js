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
import {get_category_data,edit_category,get_category_data_byid} from "../../../redux/categories/action";

import { connect } from "react-redux";
;

class Editcategory extends React.Component {

  constructor(props) {
		super(props);

		this.state = {
      data: {}

    };
    this.formValidate = this.formValidate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = async () => {

    await this.props.get_category_data_byid(this.props.match.params.clientId);
    let selectedClient = this.props.category.categoryid_list.category;

    
    await this.setState({
      data: selectedClient,
      id: this.props.match.params.clientId
    });
  }

  formValidate = () => {
    let { data, error } = this.state;
    let fieldList = [
      "name",
      "description",
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
     name:data.name,
     description:data.description
    };
    const sendData = JSON.stringify(payload);
    this.props
      .edit_category(payload)
      .then(async () => {
        this.props.history.push("/allcategory");
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
              Add category 
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">Name</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput  name="name"
                        id="name"
                        onChange={this.handleChange.bind(this)} 
                        value={data.name}
                      
											  placeholder="Enter name" />
                   
                </CCol>
               
              </CFormGroup>
              <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">Description</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput 
					          	name="description"
                        id="description"
                        onChange={this.handleChange.bind(this)} 
                        value={data.description}
                        placeholder="Enter description" />
                    
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
export default connect(mapStateToProps, { get_category_data ,edit_category,get_category_data_byid})(Editcategory);