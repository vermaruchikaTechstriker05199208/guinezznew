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
import { connect } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

class Addcategory extends React.Component {

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
    "name",
    "description",
    
		];
	
		let is_valid = true;
		for (let x of fieldList) {
			if (!data[x]) {
				is_valid = false;
				this.setState(prevState => ({
					errors: { ...prevState.errors, [x]: "Please fill in the above field" }
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
    const {isAdded} = this.props.category;
		event.preventDefault();
    if (!this.formValidate()) {
			return;
		}
		const { data } = this.state;
  
		const payload = {
      name: data.name,
      description:data.description,
		parent_id:'0'
    };

    await this.props.create_category(payload);
    // toast.success("Category added sucessfully.")

	}

  componentDidMount = async () => {
    await this.props.get_category_data()
    
  }
  render() {
  const categorydata = this.props.category;
  const {isAdded} = this.props.category;

  const { data, errors } = this.state;
 

  return (
    <>
     <CCard>
            <CCardHeader>
              Add category 
           </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
         
              <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">Category Name</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput 
												name="name"
                        id="name"
                        onChange={this.onChange}
                        value={data.name}
                        invalid={!!errors.name}
											  placeholder="Enter your category name" />
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
                    <CLabel htmlFor="textarea-input">Textarea</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="description" 
                      id="description" 
                      rows="9"
                      value={data.description}
                      onChange={this.onChange}
                      invalid={!!errors.description}
                      placeholder="Content..." 
                    />
                      {errors.description ? (
										<CLabel className="is-invalid text-danger">
											{errors.description}
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
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
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
export default connect(mapStateToProps, { create_category,get_category_data })(Addcategory);