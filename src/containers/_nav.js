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
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: '',
      //   to: '/edituser/',
    
      // },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: '',
      //   to: '/viewuser/',
    
      // },
      
      
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
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: '',
      //   to: '/editbuisness/:clientId ',
      // },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: '',
      //   to: '/viewbuisness/:clientId ',
      // },
      
    ],
  },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Components']
  // },

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
      // {
      //   _tag: 'CSidebarNavItem',
      //   // name: 'Edit category',
      //   to: '/editcategory/:clientId',
      // },
      // {
      //   _tag: 'CSidebarNavItem',
      //   // name: 'Edit category',
      //   to: '/viewcategory/:clientId',
      // },
      // {
      //   _tag: 'CSidebarNavItem',
      //   // name: 'Edit category',
      //   to: '/editsubcategory/:clientId',
      // },
      
    ],
  },
 


  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  

]

