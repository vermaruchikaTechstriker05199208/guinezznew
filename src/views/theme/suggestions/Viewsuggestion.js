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
import * as moment from 'moment'
import CIcon from '@coreui/icons-react'
import {create_category,get_category_data,get_category_data_byid,get_subcategory_data_byid} from "../../../redux/categories/action";
import {get_user_data_byid} from "../../../redux/user/action";
import { connect } from "react-redux";
const fields = ['name','description','action']
class Viewsuggestion extends React.Component {
 componentDidMount = async () => {
        await this.props.get_user_data_byid(this.props.match.params.clientId);
        const userdata = this.props.user;
     }
  render() {
  const userdata = this.props.user.update_user_id.data;

  return (
    <>
     <CCard>
            <CCardHeader>
              View User
            </CCardHeader>
            <CCardBody>
  {userdata ? <table  class="table table-striped" >
  <tbody>
                       <tr>
                         <th>First Name</th>
                         <td >{userdata.user.first_name}</td>
                       </tr>
                       <tr>
                         <th>Last Name</th>
                         <td>{userdata.user.last_name}</td>
                       </tr>
                       <tr>
                       <th>Email</th>
                         <td >{userdata.user.email}</td>
                       </tr>
                       <tr>
                       <th>Phone</th>
                         <td>{userdata.user.phone}</td>
                       </tr>
                       <tr>
                       <th >Created on</th>
                         <td> {moment(userdata.user.created_at).format('MMMM Do YYYY')}</td>
                       </tr>
                         </tbody> </table>
                      : <div class="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>}
                    
            </CCardBody>
            <CCardHeader>
           </CCardHeader>
         
          </CCard>
      
    </>
  )
}
 }


const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps, {get_user_data_byid,get_subcategory_data_byid, create_category,get_category_data,get_category_data_byid })(Viewsuggestion);