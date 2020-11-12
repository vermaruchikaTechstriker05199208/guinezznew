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
import  {get_suggestion_list} from "../../../redux/suggestion/action";
import ShowMoreText from 'react-show-more-text';
import ReadMoreReact from 'read-more-react';
const fields = ['serial no' ,'from','subject','Message']
const getBadge = action => {
  switch (action) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
  
}
  class AllSuggestion extends React.Component {
   componentDidMount = async () => {
      await this.props.get_user_list()
      await this.props.get_suggestion_list()
    }
    executeOnClick(isExpanded) {
      console.log(isExpanded);
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
    const suggestion = this.props.suggestion.suggestion_list.suggetions;  
  
    console.log(suggestion,'suggestion')
   return (
    <>
 
    <CRow>

        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              All Suggestions
            
            </CCardHeader>
            <CCardBody>
             {suggestion ?  <CDataTable
              items={suggestion}
              fields={fields}
              itemsPerPageSelect
             itemsPerPage={10}
              tableFilter
              pagination
              scopedSlots = {{
                'serial no':(suggestion)=>(<td>{suggestion.id}</td>),
                   'from':(suggestion)=>(<td>{suggestion.user.email}</td>),
                 'Message':(suggestion)=> (<td style={{width: "40%"}}>
          <ShowMoreText
                /* Default options */
                lines={3}
                more='Show more'
                less='Show less'
                className='content-css'
                anchorClass='my-anchor-css-class'
                onClick={this.executeOnClick}
                expanded={false}
                width={480}
            >
               {suggestion.message}
            </ShowMoreText>
                 
                 </td>)}}
 
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
  get_user_list,delete_user,get_suggestion_list
})(AllSuggestion);
