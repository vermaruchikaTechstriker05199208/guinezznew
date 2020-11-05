import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
        showHide: false
      };
    }
    logOut = () => {
      
      localStorage.clear();
      this.setState({
        isLogin: false
      })
  
    }
    render() {

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
      
     
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" /> 
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" /> 
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
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


export default connect(mapStateToProps)(TheHeaderDropdown);
