import React , {useState , useEffect} from 'react';
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import 'src/Styles/sass/home.scss'

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers , faBook , faQuoteRight , faDollarSign , faFile } from "@fortawesome/free-solid-svg-icons";
library.add(faUsers , faBook , faQuoteRight , faDollarSign , faFile)

function Home(props){

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [ loading , setLoading ] = useState(false)

    const [dashboardData , setDashboardData] = useState({
        usersCount : '',
        usersAdminCount : '',
        categorysCount : '',
        permissionsCount : '',
        rolesCount : '',
        articlesCount : '',
        commentsCount : '',
        booksCount : ''
    })

    useEffect(() => {
        NodejsApi.get(`/admin/dashboard` )
        .then(response => {
            if(! response.data.success){
                console.log(response.data)
                setLoading(false)
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    messages : response.data.messages
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                messages : ''
                }
            })



            console.log(response.data)
            let data = response.data.data
            // let dashboardData = data.docs
            setDashboardData({
                ...data
            });

            setLoading(false);
        } )
        .catch(err => console.log(err))

    } , [])
    
    console.log(dashboardData)

    return (
    <div className='home-dashboard'>
        <Navbar />
        <div className='dashboard'>
            <div className='cards'>
                <div className='card users'>
                    <span className='number'>{ dashboardData.usersCount }</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card active-users'>
                    <span className='number'>{ dashboardData.usersAdminCount }</span>
                    <span className='name'>مجموع کاربران ادمین</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card payments'>
                    <span className='number'>{ dashboardData.booksCount }</span>
                    <span className='name'>مجموع کتاب ها</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>{ dashboardData.articlesCount }</span>
                    <span className='name'>مجموع مقالات</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card users'>
                    <span className='number'>{ dashboardData.categorysCount }</span>
                    <span className='name'>مجموع دسته بندی ها</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card active-users'>
                    <span className='number'>{ dashboardData.commentsCount }</span>
                    <span className='name'>مجموع کامنت</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card payments'>
                    <span className='number'>{ dashboardData.permissionsCount }</span>
                    <span className='name'>مجموع مجوز</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>{ dashboardData.rolesCount }</span>
                    <span className='name'>مجموع نقش</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>{ dashboardData.usersAdminCount }</span>
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