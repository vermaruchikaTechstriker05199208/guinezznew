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
import {get_category_data,create_category} from "../../../redux/categories/action";
import { connect } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
class Subcategory extends React.Component {
constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
      data: {},
      category:{},
      errors: {},
      showMore: true,
      hideocategory:false,
      
		};
	}

  formValidate = () => {
		let { data } = this.state;
		let fieldList = [
    "name",
    "description",
    "parent_id",
    
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
	handleClick() {
    this.setState({ showMore: false })
    this.setState({hideocategory:true })

	}
	async handleSubmit(event) {
    const newdata = this.props.category;

    event.preventDefault();
    if (!this.formValidate()) {
			return;
		}

    const { data} = this.state;
if(data){
		const payload = {

      name: data.name,
      description:data.description,
      parent_id:data.parent_id,
      
   
    };
await this.props.create_category(payload);
const categorydatastatus = this.props.category.create_category.data.status;
{categorydatastatus == 201 ? toast.success("SubCategory added sucessfully.") : toast.error("The name has already been taken.")}

  }
}
  componentDidMount = async () => {
    await this.props.get_category_data()
    
  }
render(){
  const categorydata = this.props.category.category_list.categories;

  const newdata = this.props.category;

  const { data, errors } = this.state;

  return (
    <>
     <CCard>

            <CCardHeader>
              Add Sub Category 
           
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                 
              <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Category Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    
                    <CSelect custom name="parent_id" id="parent_id"  invalid={!!errors.parent_id} onClick={() => this.handleClick()}   onChange={this.onChange} value= {data.parent_id}>
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

                <CFormGroup  hidden={this.state.showMore} row>
                
                <CCol md="3">
       
                  <CLabel htmlFor="select">Add Sub category</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput name="name" id="name" onChange={this.onChange} value={data.name} invalid={!!errors.name}
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

                <CFormGroup  hidden={this.state.showMore} row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                       name="description" 
                       id="description" 
                       rows="9"
                       value={data.description}
                       onChange={this.onChange}
                       placeholder="Content..." 
                       invalid={!!errors.description}
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
              <CButton type="submit" onClick={this.handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>

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


export default connect(mapStateToProps, {
	get_category_data,
  create_category
})(Subcategory);