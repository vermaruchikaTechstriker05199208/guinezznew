import React,{ Suspense } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import { connect } from "react-redux";
import {
  get_user_list,
  
} from "../../../redux/user/action";
import {get_buisnsess_data} from "../../../redux/allbuisness/action";
import DataTable from 'react-data-table-component';

const fields = ['name','phone','email','action']


  class Allbuisness extends React.Component {
 
   componentDidMount = async () => {
      await this.props.get_user_list()
      await this.props.get_buisnsess_data()
    }
     render(){
 const allbuisness = this.props.allbuisness.business_list.businesses;
 return (
    <>
 <CRow>
  <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Buisnesses
            
            </CCardHeader>
         {allbuisness ?    <CCardBody>
             {allbuisness ?  <CDataTable
              items={allbuisness}
              fields={fields}
              itemsPerPage={10}
              itemsPerPageSelect
              tableFilter
              pagination
              scopedSlots = {{
                'action':
                  (tabledata)=>(
                    <tr>
                      <td><CButton type="submit" size="sm" onClick={e => this.props.history.push('/viewbuisness/' + tabledata.id)}    color="info">view</CButton></td>
                           <td><CButton type="submit" size="sm"  onClick={e => this.props.history.push('/editBuisness/' + tabledata.id)}   color="success">edit</CButton></td>
                      <td> <CButton type="submit" size="sm"  color="danger" >delete</CButton></td>
                    
                    </tr>
                 
                    ) }}

            /> :"" }
           
            </CCardBody> : <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>}
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
  get_user_list,get_buisnsess_data
})(Allbuisness);
