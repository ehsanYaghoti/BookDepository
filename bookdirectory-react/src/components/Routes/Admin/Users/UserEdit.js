// Modules
import React ,{  useEffect  , useState}   from 'react';
import { useParams } from 'react-router-dom';
import NodejsApi from 'src/Api/NodejsApi';

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';


// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes)


function UserEdit(props) {
    
    const [userState , setUserState] = useState({
        username : '',
        email : '',
        password : ''
    });
    const [loading , setLoading] = useState(false);
    const [validation , setValidation] = useState(true);
    const [close , setClose] = useState(false);
    const [successMessage , setSuccessMessage ]= useState(false);

    const [messages , setMessages] = useState([])
    // const [formData , setFormData] = useState([])

    let params = useParams();

    useEffect(function(){
        console.log('edit')
        NodejsApi.get(`/admin/user/edit/${params.id}`)
            .then(response => { 
                console.log(response.data.data)
                let user = response.data.data
                setUserState({
                    username : user.username,
                    email : user.email
                })
            })
            .catch(err => console.log(err))
    },[params.id])

    let formHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        let user = userState
        NodejsApi.put(`/admin/user/edit/${params.id}` , user)
            .then(response =>  {
                console.log(response)

                if(! response.data.success){
                    console.log('notsuccess')

                    setValidation(false);
                    setClose(false);
                    setLoading(false);
                    setMessages(response.data.messages);
                    const user = response.data.data
                    setUserState({
                        username : user.username,
                        email : user.email
                    })
                    return;
                } else if(response.data.success){
                        console.log('success')
                        // const user = response.data.data
                        // setUserState(prevState => {
                        //     return {
                        //     ...prevState ,
                        //     username : user.username,
                        //     email : user.email
                        // }})
                        setValidation(true);
                        setSuccessMessage(true);
                        
                }
                setLoading(false);
            })
            .catch(err => { return console.log(err)})

        console.log('submit')
    }
    
    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value
        setUserState(prevState => {
            return {
            ...prevState ,
            [name] : value
        }})
        // return setUserState({
        //     [name] : value
        // })
    }

    let closeController = (e) => {
        setClose(true);
    }
    
    console.log(userState)

    return (
        <div className='home-dashboard'>
            <Navbar />
            <div className='dashborad-body'>
                <h2 className='dashborad-body-title'>ویرایش کاربر</h2>
                    {   
                        loading 
                        ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                        : 
                        ! validation 
                        ?   <>
                            <div className={ close ? 'closed' : "validErrors" }   >
                                <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                {   messages.map((error)=>{
                                    return (<span>{error}</span>)   
                                    })
                                }
                            </div>                                                 
                            <form onSubmit={formHandler} className='formContainer'>
                                <label>نام کاربری :
                                    <input type='text' value={ userState.username}  onChange={inputHandler} name='username' placeholder='نام کاربری را در اینجا وارد کنید ...'/>
                                </label>
                                <label>ایمیل :
                                    <input type='text'   value={userState.email} onChange={inputHandler} name='email' placeholder='ایمیل  را در اینجا وارد کنید ...'/>
                                </label>
                                <button type='submit' className='button'>ویرایش کاربر</button>
                            </form>
                            </>                                
                        : successMessage ?
                        <>
                        <div className='successMessage'>
                            <span>عملیات با موفقیت انجام شد</span>
                        </div>
                        <form onSubmit={formHandler} className='formContainer'>
                            <label>نام کاربری :
                                <input type='text' value={userState.username} onChange={inputHandler} name='username' placeholder='نام کاربری را در اینجا وارد کنید ...'/>
                            </label>
                            <label>ایمیل :
                                <input type='text' value={userState.email} onChange={inputHandler} name='email' placeholder='ایمیل  را در اینجا وارد کنید ...'/>
                            </label>
                            <button type='submit'  className='button'>ویرایش کاربر</button>
                        </form>
                        </>
                        :
                        (
                        <form onSubmit={formHandler} className='formContainer'>
                            <label>نام کاربری :
                                <input type='text' value={userState.username} onChange={inputHandler} name='username' placeholder='نام کاربری را در اینجا وارد کنید ...'/>
                            </label>
                            <label>ایمیل :
                                <input type='text' value={userState.email} onChange={inputHandler} name='email' placeholder='ایمیل  را در اینجا وارد کنید ...'/>
                            </label>
                            <button type='submit'  className='button'>ویرایش کاربر</button>
                        </form>
                        )
                    }
            </div>
        </div>
    )
}

export default UserEdit;