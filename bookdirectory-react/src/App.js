// Styles
// import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import 'src/Styles/fonts/font-face.css'
import React from 'react';

import { Route , BrowserRouter as Router , Switch } from 'react-router-dom';


// import Authentication Routes
// import Register from 'src/components/Routes/Auth/Register';
// import Login from 'src/components/Routes/Auth/Login';
// import ForgotPassword from 'src/components/Routes/Auth/ForgotPassword';
// import ResetPassword from 'src/components/Routes/Auth/ResetPassword';


// import Home Routes
// import LandingPage from 'src/components/Routes/Home/LandingPage';


// import Admin Routes
import Home from 'src/components/Routes/Admin/Home';

import Users from 'src/components/Routes/Admin/Users/Users';
import UserCreate from 'src/components/Routes/Admin/Users/UserCreate';
import UserEdit from 'src/components/Routes/Admin/Users/UserEdit';

import Categories from 'src/components/Routes/Admin/Categories/Categories';
import CategoryCreate from 'src/components/Routes/Admin/Categories/CategoryCreate';
import CategoryEdit from 'src/components/Routes/Admin/Categories/CategoryEdit';

import Books from 'src/components/Routes/Admin/Books/Books';
import BookCreate from 'src/components/Routes/Admin/Books/BookCreate';
import BookEdit from 'src/components/Routes/Admin/Books/BookEdit';

import Posts from 'src/components/Routes/Admin/Posts/Posts';
import PostCreate from 'src/components/Routes/Admin/Posts/PostCreate';
import PostEdit from 'src/components/Routes/Admin/Posts/PostEdit';

import Articles from 'src/components/Routes/Admin/Articles/Articles';
import ArticleCreate from 'src/components/Routes/Admin/Articles/ArticleCreate';
import ArticleEdit from 'src/components/Routes/Admin/Articles/ArticleEdit';

import Permissions from 'src/components/Routes/Admin/Permissions/Permissions';
import PermissionCreate from 'src/components/Routes/Admin/Permissions/PermissionCreate';
import PermissionEdit from 'src/components/Routes/Admin/Permissions/PermissionEdit';

import Roles from 'src/components/Routes/Admin/Roles/Roles';
import RoleCreate from 'src/components/Routes/Admin/Roles/RoleCreate';
import RoleEdit from 'src/components/Routes/Admin/Roles/RoleEdit';

import Comments from 'src/components/Routes/Admin/Comments/Comments';


import NotFound from 'src/components/Routes/NotFound';




function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path='/' exact  component={LandingPage} /> */}

    
          {/* <Route path='/auth/register' exact  component={Register} />
          <Route path='/auth/login' exact  component={Login} />
          <Route path='/auth/forgotPassword' exact  component={ForgotPassword} />
          <Route path='/auth/password/reset'   component={ResetPassword} /> */}



          <Route path='/' exact  component={Home} />
          <Route path='/admin/users' exact component={Users} />
          <Route path='/admin/users/create' component={UserCreate} />
          <Route path='/admin/users/edit/:id' component={UserEdit}  />
          <Route path='/admin/categories' exact component={Categories} />
          <Route path='/admin/categories/create' component={CategoryCreate} />
          <Route path='/admin/categories/edit/:id' component={CategoryEdit}  />

          <Route path='/admin/books' exact component={Books} />
          <Route path='/admin/books/create'  component={BookCreate} />
          <Route path='/admin/books/edit/:id'  component={BookEdit} />

          <Route path='/admin/posts' exact component={Posts} />
          <Route path='/admin/posts/create'  component={PostCreate} />
          <Route path='/admin/posts/edit/:id'  component={PostEdit} />
          <Route path='/admin/articles' exact component={Articles} />
          <Route path='/admin/articles/create'  component={ArticleCreate} />
          <Route path='/admin/articles/edit/:id'  component={ArticleEdit} />
          <Route path='/admin/permissions' exact component={Permissions} />
          <Route path='/admin/permissions/create'  component={PermissionCreate} />
          <Route path='/admin/permissions/edit/:id'  component={PermissionEdit} />
          <Route path='/admin/roles' exact component={Roles} />
          <Route path='/admin/roles/create'  component={RoleCreate} />
          <Route path='/admin/roles/edit/:id'  component={RoleEdit} />
          <Route path='/admin/comments' exact component={Comments} />

          <Route path='' component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;