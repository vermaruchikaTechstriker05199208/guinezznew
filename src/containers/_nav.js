import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },




  {
    _tag: 'CSidebarNavDropdown',
    name: 'Users',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
   
      {
        _tag: 'CSidebarNavItem',
        name: 'All Users',
        to: '/allusers',
      },
     
      {
        _tag: 'CSidebarNavItem',
        name: 'Add',
        to: '/adduser',
      },
    
      
      
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Buisnesses',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
   
      {
        _tag: 'CSidebarNavItem',
        name: 'All buisnesses',
        to: '/allbuisness',
      },
     
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Buisness',
        to: '/addbuisness',
      },
    
      
    ],
  },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'Categories',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: ' Categories',
        to: '/allcategory',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add category',
        to: '/addcategory',
      },
     
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Sub category',
        to: '/subcategory',
      },

      
    ],
  },
 



  

]

