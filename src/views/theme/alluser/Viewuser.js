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

import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
const fields = ['name','description','action']
class Viewuser extends React.Component {

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
        // await this.props.get_subcategory_data_byid(this.props.match.params.clientId);
        // await this.props.get_category_data_byid(this.props.match.params.clientId);
        //  let selectedClient = this.props.category.categoryid_list.category;

        
        // await this.setState({
        //   data: selectedClient,
        //   id: this.props.match.params.clientId
        // });
      }
  render() {
  const categorydata = this.props.category.subcategoryid_list.categories;
  const parentcategorydata = this.props.category.categoryid_list.category;
  console.log(parentcategorydata,'categorydata')
  const {isAdded} = this.props.category;

  const { data,subcatdata, errors } = this.state;
 console.log(data.name,'data')

  return (
    <>
     <CCard>
            <CCardHeader>
              View User
            </CCardHeader>
            <CCardBody>
             
        
            </CCardBody>
            <CCardHeader>
              
          
            </CCardHeader>
            <CCardBody>
              
          
        
             </CCardBody>
          </CCard>
      
    </>
  )
}
 }


const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps, {get_subcategory_data_byid, create_category,get_category_data,get_category_data_byid })(Viewuser);