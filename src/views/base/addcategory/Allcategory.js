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
// import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import { connect } from "react-redux";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import usersData from '../../users/UsersData'
// import axios from "axios";
import {
  get_user_list,delete_user,
  
} from "../../../redux/user/action";

import {get_category_data,delete_category} from "../../../redux/categories/action";
const fields = ['name','description','action']
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

  class Allcategory extends React.Component {
    
   componentDidMount = async () => {
    await this.props.get_category_data()

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
              this.props.delete_category(id)
          }
      })
  }
     render(){
      const categorydata = this.props.category.category_list.categories;

       
    
  return (
    <>

    <CRow>

        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Categories
          
            </CCardHeader>
            <CCardBody>
             {categorydata ?       <CDataTable
               items={categorydata}
              fields={fields}
              itemsPerPageSelect
             itemsPerPage={10}
              tableFilter
           
              pagination
              scopedSlots = {{
                'action':
                (categorydata)=>(
                  <tr>
                    <td><CButton type="submit" size="sm"  onClick={e => this.props.history.push('/viewcategory/' + categorydata.id)}  color="info">view</CButton></td>
                    <td><CButton type="submit" size="sm"  color="success" onClick={e => this.props.history.push('/editcategory/' + categorydata.id)} >edit</CButton></td>
                    <td> <CButton type="submit" size="sm" color="danger" onClick={e => this.confirmDialod(categorydata.id)}  >delete</CButton></td>
                   </tr>
               
                  )

              }}
            />  : <div class="d-flex justify-content-center">
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
  get_user_list,delete_user,get_category_data,delete_category
})(Allcategory);
