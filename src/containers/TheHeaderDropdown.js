import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CCardFooter,
  CButton,
  CRow,
  CCol
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { get_user_profile } from "../../src/redux/user/action";
import { Modal } from 'react-bootstrap';
import * as moment from 'moment'
const mapStateToProps = state => ({
  ...state
});
  class TheHeaderDropdown extends React.Component {
    constructor(props) {
      super(props);
  
      this.logOut = this.logOut.bind(this);
      this.state = {
        isOpen: false,
        isLogin: localStorage.getItem('isLogin') ? true : false,
      
        showHide: false,
        showMore: false,
        popup: false,
      };
    }
    componentDidMount = async () => {
   
      await this.props.get_user_profile()
      // await this.props.delete_user()
    }

    handleModalShowHide() {
 
		  this.setState({ showHide: !this.state.showHide })
      this.setState({ popup: true })

     
    }
    logOut = () => {
      
      localStorage.clear();
      this.setState({
        isLogin: false
      })
  
    }
    render() {
const userprofile = this.props.user.User_profile.my_profile;





      if (this.state.isLogin === false) {
     
        return <Redirect to='/login' />
      }
      return (
  
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        > 
          <strong>Account</strong>
        </CDropdownItem>
      
     
        <CDropdownItem  onClick={() => this.handleModalShowHide()} >
          <CIcon name="cil-credit-card" className="mfe-2"  /> 
          My profile
          {/* <CBadge color="secondary" className="mfs-auto">42</CBadge> */}
        </CDropdownItem>
        <Modal  show={this.state.showHide} style={{border:"5px solid #cf7419 !important"}}>
					<Modal.Header className="popupheader" >
						<Modal.Title >User profile</Modal.Title>
					</Modal.Header>

					<Modal.Body className="popupbox">

          {userprofile ? 
           <CRow >
           <CCol md="12">

           <table  class="table table-striped" >
  <tbody>
                       <tr>
                         <th>Name</th>
                         <td >{userprofile.first_name}{userprofile.last_name}</td>
                       </tr>
                       <tr>
                         <th>Email</th>
                         <td>{userprofile.email}</td>
                       </tr>
                       <tr>
                       <th>Phone no.</th>
                         <td >{userprofile.phone}</td>
                       </tr>
                       <tr>
                       <th>Created On</th>
                         <td>{moment(userprofile.updated_at).format('MMMM Do YYYY')}</td>
                       </tr>
                       <tr>
                       <th>Last Updated On</th>
                         <td>{moment(userprofile.updated_at).format('MMMM Do YYYY')}</td>
                       </tr>
                     
                         </tbody> </table>
</CCol>
   </CRow> : ""}
                   
					</Modal.Body >
					<Modal.Footer className="footeralert">
                    <CButton type="reset" size="sm" onClick={() => this.handleModalShowHide()} color="danger"> close</CButton>
        
					</Modal.Footer>
				</Modal>
        {/* <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" /> 
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
        <CDropdownItem divider />
        {/* <CDropdownItem>
          <CIcon   onClick={this.logOut} name="cil-lock-locked" className="mfe-2" /> 
          Lock Accountssss
        </CDropdownItem> */}
        <CDropdownItem
                      onClick={this.logOut}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
      }
}



export default connect(mapStateToProps, {
  get_user_profile
})(TheHeaderDropdown);