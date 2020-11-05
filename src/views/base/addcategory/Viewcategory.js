import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CCardHeader,
  CFormGroup,
  CDataTable,
  CLabel,
  CCol,
  CInput,
  CTextarea,
  CCardFooter

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {create_category,get_category_data,get_category_data_byid,get_subcategory_data_byid} from "../../../redux/categories/action";
import { connect } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
const fields = ['name','description','action']
class Viewcategory extends React.Component {

  constructor(props) {
		super(props);

		this.state = {
            info:'false',
            data: {},
            subcatdata:{},
            errors: {},
            showHide: false,
			showMore: false,
			popup: false,
        };
        this.onSelect = this.onSelect.bind(this);
     
	}

  
    handleModalShowHide() {
		this.setState({ showHide: !this.state.showHide })
        this.setState({ popup: true })
       
	}
    onSelect = async e =>{
        let parentCatID = e.target.value;
        console.log(parentCatID,'iddd');
        this.props.get_subcategory_data_byid(parentCatID);
      }


    componentDidMount = async () => {
        await this.props.get_subcategory_data_byid(this.props.match.params.clientId);
        await this.props.get_category_data_byid(this.props.match.params.clientId);
         let selectedClient = this.props.category.categoryid_list.category;
         const categoryData = this.props.category.subcategoryid_list.categories;
        
        await this.setState({
          subcatdata: categoryData,
          data: selectedClient,
          id: this.props.match.params.clientId
        });
      }
  render() {
  const categorydata = this.props.category.subcategoryid_list.categories;
  const parentcategorydata = this.props.category.categoryid_list.category;
  console.log(parentcategorydata,'categorydata')
  const {isAdded} = this.props.category;

  const { data,subcatdata, errors } = this.state;
 console.log(data.name,'data')
 console.log(subcatdata,'subcatt')

  return (
    <>
     <CCard>
            <CCardHeader>
              Category View
            </CCardHeader>
            <CCardBody>
                <h3>Parent category : {data.name}</h3>
                <h3>Description :</h3>  {data.description}
            </CCardBody>
            <CCardHeader>
              <h2>Subcategory view</h2>
          
            </CCardHeader>
            <CCardBody>
              
             <CDataTable
                items={categorydata}
               fields={fields}
            
               itemsPerPage={10}
               pagination
               scopedSlots = {{
                 'action':
                 (categorydata)=>(
                   <tr>
                      {/* onClick={() => this.handleModalShowHide()} */}
              <td>   <CButton color="info"   onClick={e => this.props.history.push('/editsubcategory/' + categorydata.id)}  className="mr-1">update</CButton></td>
              <td> <CButton type="submit" size="sm" color="danger">delete</CButton></td>
                </tr>
                
                   )
 
               }}
             />
                 <Modal show={this.state.showHide}>
					<Modal.Header className="popupheader" closeButton  onClick={() => this.handleModalShowHide()}>
						<Modal.Title >Update subcategory</Modal.Title>
					</Modal.Header>

					<Modal.Body className="popupbox">
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
						) : ("")}
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
						{errors.description}</CLabel>
									) : (
										""
									)}
                  </CCol>
                </CFormGroup>
              </CForm>

              </CCardBody>
          
					</Modal.Body >
					<Modal.Footer className="footeralert">
                    <CCardFooter>
              <CButton type="submit" 	onClick={this.handleSubmit}  size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>


					</Modal.Footer>
				</Modal>
             </CCardBody>
          </CCard>
          <ToastContainer hideProgressBar={true} />
    </>
  )
}
 }


const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps, {get_subcategory_data_byid, create_category,get_category_data,get_category_data_byid })(Viewcategory);