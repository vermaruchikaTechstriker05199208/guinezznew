import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));

const Subcategory = React.lazy(() => import('./views/base/subcategory/Subcategory'));
const Addcategory = React.lazy(() => import('./views/base/addcategory/Addcategory'));
const Allcategory = React.lazy(() => import('./views/base/addcategory/Allcategory'));
const Editcategory = React.lazy(() => import('./views/base/addcategory/Editcategory'));
const Viewcategory = React.lazy(() => import('./views/base/addcategory/Viewcategory'));
const Editsubcategory = React.lazy(() => import('./views/base/addcategory/Editsubcategory'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Alluser = React.lazy(() => import('./views/theme/alluser/Alluser'));
const Adduser = React.lazy(() => import('./views/theme/alluser/Adduser'));
const Edituser = React.lazy(() => import('./views/theme/alluser/Edituser'));
const Viewuser = React.lazy(() => import('./views/theme/alluser/Viewuser'));

const Allbuisness = React.lazy(() => import('./views/theme/allbuisness/Allbuisness'));
const Addbuisness = React.lazy(() => import('./views/theme/allbuisness/Addbuisness'));
const Editbuisness = React.lazy(() => import('./views/theme/allbuisness/Editbuisness'));
const Viewbuisness = React.lazy(() => import('./views/theme/allbuisness/Viewbuisness'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/allusers', name: 'All user', component: Alluser },
  { path: '/adduser', name: 'Add user', component: Adduser},
  { path: '/edituser/', name: 'Edit user', component: Edituser },
  { path: '/viewuser/', name: ' View user', component: Viewuser },
  { path: '/allbuisness', name: 'All buisness', component: Allbuisness },
  { path: '/addbuisness', name: 'Add buisness', component: Addbuisness },
  { path: '/editbuisness', name: 'Edit buisness', component: Editbuisness },
  { path: '/viewbuisness/:clientId', name: 'View buisness', component: Viewbuisness },
  { path: '/subcategory', name: 'Sub category', component: Subcategory },
  { path: '/addcategory', name: 'Add category', component: Addcategory },
  { path: '/allcategory', name: 'All category', component: Allcategory },
  { path: '/editcategory/:clientId', name: 'Edit category', component:Editcategory, },
  { path: '/viewcategory/:clientId', name: 'view category', component:Viewcategory, },
  { path: '/editsubcategory/:clientId', name: 'Edit subcategory', component:Editsubcategory, },
  { path: '/base/forms', name: 'Forms', component: BasicForms },

  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
