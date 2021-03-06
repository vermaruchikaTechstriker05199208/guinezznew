import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  

} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { connect } from "react-redux";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Redirect } from 'react-router-dom';
import {
  get_user_list,delete_user
  
} from "../../../redux/user/action";
import * as moment from 'moment'
const fields = ['first_name','email','phone','updated on','action']
const getBadge = action => {
  switch (action) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
  
}
  class Alluser extends React.Component {
   componentDidMount = async () => {

      
      await this.props.get_user_list()
   
    }
    componentDidUpdate(){
      this.componentDidMount();
}
  confirmDialod = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Are You Sure you want to delete this User!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            this.props.delete_user(id)
        }
    })
}
     render(){
      const tabledata = this.props.user.user_list.users;
      
     let token = localStorage.getItem("accessToken");
   if (!token) {
       return <Redirect to='/login' />
        }
   return (
    <>
 
    <CRow>

        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              All Users
            
            </CCardHeader>
            <CCardBody>
             {tabledata ?  <CDataTable
              items={tabledata}
              fields={fields}
              itemsPerPageSelect
             itemsPerPage={10}
              tableFilter
              pagination
              scopedSlots = {{
                'action':
                  (tabledata)=>(
                    <tr>
                           <td><CButton type="submit" size="sm" onClick={e => this.props.history.push('/viewuser/' + tabledata.id)}   color="info">view</CButton></td>
                           <td><CButton type="submit" size="sm"  onClick={e => this.props.history.push('/edituser/' + tabledata.id)}  color="success">edit</CButton></td>
                      <td> <CButton type="submit" size="sm"  color="danger"  onClick={e => this.confirmDialod( tabledata.id)}  >delete</CButton></td>

                 </tr>
                   ),
                   'updated on':(tabledata)=>(
                
                   <td> {moment(tabledata.updated_at).format('MMMM Do YYYY')}</td>
                   )
 }}
            /> : <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div> }
           
            
           </CCardBody>
           </CCard>
      </CCol>
 </CRow>
    </>
  )
}
  }
const mapStateToProps = state => ({
  ...state
});


export default connect(mapStateToProps, {
  get_user_list,delete_user
})(Alluser);
