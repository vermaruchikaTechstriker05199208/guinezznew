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
  CCardFooter,

  CRow

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {get_buisness_data_byid,Viewbuisness_data_byid,} from "../../../redux/allbuisness/action";
import { connect } from "react-redux";
import * as moment from 'moment'
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
     this.props.get_subcategory_data_byid(parentCatID);
      }
componentDidMount = async () => {
         await this.props.get_buisness_data_byid(this.props.match.params.clientId);
         await this.props.Viewbuisness_data_byid(this.props.match.params.clientId);
      }
  render() {
  const buisnessdata = this.props.allbuisness.view_buisness_id.business;
return (
    <>
     <CCard>
            <CCardHeader>
              View Buisness
            </CCardHeader>
            <CCardBody>
            </CCardBody>
            <CCardHeader>
            {buisnessdata ?           
                       <table class="table table-striped" >
                         <tbody>
                       <tr>
                         <th >Buisness Name</th>
                         <td >{buisnessdata.name}</td>
                       </tr>
                       <tr>
                         <th >Buisness Email</th>
                         <td >{buisnessdata.email}</td>
                       </tr>
                       <tr>
                       <th>Address</th>
                         <td>{buisnessdata.address}</td>
                       </tr>
                       <tr>
                       <th>Direct Marketing </th>
                         <td>{buisnessdata.dm == 0 ? 'Yes' : "No"}</td>
                       </tr>
                       <tr>
                       <th>Home Delivery </th>
                         <td>{buisnessdata.home_delivery == 0 ? 'Yes' : "No"}</td>
                       </tr>
                       <tr>
                       <th>Phone call </th>
                         <td>{buisnessdata.phone_call == 0 ? 'Yes' : "No"}</td>
                       </tr>
                       <tr>
                       <th>Service Description </th>
                         <td>{buisnessdata.services_description}</td>
                       </tr>
                       <tr>
                       <th>Created On </th>
                         <td>{moment(buisnessdata.created_at).format('MMMM Do YYYY')}</td>
                       </tr>
                       <tr>
                       <th>Updated  On </th>
                         <td>{moment(buisnessdata.updated_at).format('MMMM Do YYYY')}</td>
                       </tr>
                       </tbody>
                     </table>: <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>}
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
export default connect(mapStateToProps, {get_buisness_data_byid ,Viewbuisness_data_byid})(Viewbuisness);