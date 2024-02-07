import React from 'react';

// import Layouts
import Navbar from '../layouts/navabar'

// import Styles
import './../../Styles/home.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers , faBook , faQuoteRight , faDollarSign , faFile } from "@fortawesome/free-solid-svg-icons";
library.add(faUsers , faBook , faQuoteRight , faDollarSign , faFile)

function Home(props){

    
    
    
    return (
    <div className='home-dashboard'>
        <Navbar />
        <div className='dashboard'>
            <div className='cards'>
                <div className='card users'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card active-users'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card payments'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card users'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card active-users'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card payments'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>۱۲۰۰</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Home;