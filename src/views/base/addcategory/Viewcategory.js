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
import {create_category,get_category_data,get_category_data_byid,get_subcategory_data_byid,edit_category} from "../../../redux/categories/action";
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
            SubCategorydata:{},
            errors: {},
            showHide: false,
		      	showMore: false,
            popup: false,
            datasubnew:{},
          
        };
        this.onSelect = this.onSelect.bind(this);
        this.formValidate = this.formValidate.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleModalShowHide(subCatID) {
      this.props.get_category_data_byid(subCatID);
		  this.setState({ showHide: !this.state.showHide })
      this.setState({ popup: true })

     
    }
      formValidate = () => {
      const SubCategorydata = this.props.category.categoryid_list.category;
    let fieldList = [
      "name",
      "description",
    ];
    let is_valid = true;
    for (let x of fieldList) {
      if (!SubCategorydata[x]) {
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
    const SubCategorydata = this.props.category.categoryid_list.category;
    let name = event.target.name;
    let value = event.target.value;

    SubCategorydata[name] = value;

    this.setState({SubCategorydata})
}

    handleSubmit(event) {
      event.preventDefault();
       
      const SubCategorydata = this.props.category.categoryid_list.category;
        if (!this.formValidate()) {
          return;
        }if (SubCategorydata){
        const payload = {
         id: SubCategorydata.id, 
         name:SubCategorydata.name,
         description:SubCategorydata.description
        };
      console.log(payload,'dfdfa')
        
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
    
      
      await this.setState({
        
        data: selectedClient,
        id: this.props.match.params.clientId
      });
      console.log('on cancel!!');
    }
  render() {
    const SubCategorydata = this.props.category.categoryid_list.category;
    if(SubCategorydata) {
      console.log(SubCategorydata.name,'SubCategorydata name');
    }
    const categorydata = this.props.category.subcategoryid_list.categories;
     const {isAdded} = this.props.category;
    
    
  const { data, errors, datasub,datasubnew } = this.state;

console.log(datasubnew,'sfdfd')

  return (
    <>
     <CCard>

    
            <CCardHeader>
              Category View
            </CCardHeader>
            <CCardBody style={{display:"grid"}}>
               <div style={{display:"inline-flex"}} ><h4>Parent category : </h4>  <p style={{fontSize:"18px"}}>{data.name}</p></div> 
               
               <div style={{display:"inline-flex"}} ><h4>Description : </h4>  <p style={{fontSize:"18px"}}>{data.description}</p></div> 
      
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
             
              <td>   <CButton color="info"   onClick={() => this.handleModalShowHide(categorydata.id)}  className="mr-1">Update </CButton></td>
              <td> <CButton type="submit" size="sm" color="danger">delete</CButton></td>
                </tr>
                
                   ) }}
             />
                 <Modal show={this.state.showHide}>
					<Modal.Header className="popupheader" >
						<Modal.Title >Update subcategory</Modal.Title>
					</Modal.Header>

					<Modal.Body className="popupbox">
                    <CCardBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  {SubCategorydata ? <CFormGroup row>
                
                <CCol md="3">
                  <CLabel htmlFor="select">Category Name</CLabel>
                </CCol>
                
                <CCol xs="12" md="9">
                <CInput 
            name="name"
                        id="name"
                        onChange={this.handleChange.bind(this)} 
                        value={SubCategorydata.name}
                        invalid={!!errors.name}
            placeholder="Enter your category name" />
                   {errors.name ? (
          <CLabel className="is-invalid text-danger">
            {errors.name}
            </CLabel>
            ) : ("")}
                </CCol>
               
              </CFormGroup> : " "}
                    
                  {SubCategorydata ?     <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="textarea-input">Textarea</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CTextarea 
                          name="description" 
                          id="description" 
                          rows="9"
                          value={SubCategorydata.description}
                          onChange={this.handleChange.bind(this)} 
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
                    </CFormGroup> : "" }
              
              </CForm>

              </CCardBody>
          
					</Modal.Body >
					<Modal.Footer className="footeralert">
                    <CCardFooter>
                  
              <CButton type="submit" 	onClick={this.handleSubmit}  size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" onClick={() => this.handleModalShowHide()} color="danger"><CIcon name="cil-ban" /> cancel</CButton>
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
export default connect(mapStateToProps, {get_subcategory_data_byid, create_category,get_category_data,get_category_data_byid,edit_category })(Viewcategory);