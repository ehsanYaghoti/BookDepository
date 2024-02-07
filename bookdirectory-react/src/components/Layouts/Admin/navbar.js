import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers , faBook , faQuoteRight , faDollarSign , faFile ,faNewspaper } from "@fortawesome/free-solid-svg-icons";
library.add(faUsers , faBook , faQuoteRight , faDollarSign , faFile , faNewspaper)


function Navbar(props){

    return (
    <div className='navbar'>
        <NavLink to='/admin' exact className='nav-icon' ><FontAwesomeIcon icon='book' /> کتابخانه</NavLink>
        <NavLink to='/admin/users' className='nav-link' activeClassName='active-link'><FontAwesomeIcon icon='users' /><span> مدیریت کاربران </span></NavLink>
        <NavLink to='/admin/permissions' className='nav-link' activeClassName='active-link'><FontAwesomeIcon icon='users' /><span> مدیریت مجوز ها </span></NavLink>
        <NavLink to='/admin/roles' className='nav-link' activeClassName='active-link'><FontAwesomeIcon icon='users' /><span> مدیریت نقش ها </span></NavLink>
        <NavLink to='/admin/books' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='book' /> <span>مدیریت محصولات </span></NavLink>
        <NavLink to='/admin/articles' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='newspaper' /> <span>مدیریت مقاله ها </span></NavLink>
        <NavLink to='/admin/comments' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='quote-right' /><span>مدیریت دیدگاه ها </span></NavLink>
        <NavLink to='/admin/categories' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='file' /><span>مدیریت دسته بندی ها </span></NavLink>
        <NavLink to='/admin/shopping' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='dollar-sign' /><span>خرید ها و پرداخت ها </span></NavLink>
    </div>
    )
};

export default Navbar;