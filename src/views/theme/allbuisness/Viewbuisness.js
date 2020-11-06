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
import {get_buisness_data_byid} from "../../../redux/allbuisness/action";
import { connect } from "react-redux";

import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
const fields = ['name','description','action']
class Viewbuisness extends React.Component {

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
         await this.props.get_buisness_data_byid(this.props.match.params.clientId);
      }
  render() {
  const buisnessdata = this.props.allbuisness.buisness_id.message;
console.log(this.props.match.params.clientId,'clientt')
 console.log(buisnessdata,'data')

  return (
    <>
     <CCard>
            <CCardHeader>
              View Buisness
            </CCardHeader>
            <CCardBody>
              
        
            </CCardBody>
            <CCardHeader>
              {buisnessdata}
          
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
export default connect(mapStateToProps, {get_subcategory_data_byid, create_category,get_category_data,get_category_data_byid,get_buisness_data_byid })(Viewbuisness);