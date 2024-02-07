// Modules
import React    from 'react';
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


class CategoryCreate extends React.Component {
    
    state = { 
        category : { 
            name : '',
            parent : 'none',
        } ,
        success : { state : true ,  message : ''},
        param : '',
        prevParents : [],
        loading : false ,
        validation : true ,
        messages : [],
        formData : [],
        close : false,
        result : false
    }

    

    componentDidMount(){
        this.setState(prevState => {
            return {
                ...prevState,
                loading : true,
                param : this.props.match.params.id
            }
        })
        NodejsApi.get(`/admin/category/edit/${this.props.match.params.id}`)
        .then(response => {
            console.log(response.data)
            if(! response.data.success){
                return  this.setState(prevState => {
                   return {
                    ...prevState,
                    success : {
                        state : response.data.success ,
                        message : response.data.data
                    },
                    loading : false
                    }
                })
              
            }

            this.setState(prevState => {
                return {
                ...prevState,
                category : {
                    name : response.data.data.category.name
                },
                prevParents : response.data.data.categories,
                success : {
                    state : response.data.success ,
                    message : ''
                },
                loading : false
                }
            })

        })
        .catch(err =>  console.log(err))
    }


    render(){
 

        let formHandler = (e) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    loading : true
                }
            })
            e.preventDefault();
            let category = this.state.category
            NodejsApi.put(`/admin/category/${this.state.param}/update` , category)
                .then(response =>  {
                    console.log(response.data)
                    if(! response.data.success){
                        return this.setState(prevState => {
                            return {
                                ...prevState,
                                validation : false ,
                                close : false,
                                loading : false ,
                                messages : response.data.messages,
                            }
                        })
                    } else if(response.data.success){
                        console.log('result = true')
                         this.setState((prevState) => {
                            return{
                                ...prevState,
                                messages : [],
                                formData : [],
                                validation : true,
                                loading : false,
                                result : true
                                
                            }
                        })
                    }

                })
                .catch(err => { return console.log(err)})
                this.setState(prevState => {
                    return {
                        ...prevState,
                        loading : false,
                        
                    }
                })
            console.log('submit')
        }
    
        let inputHandler = (e) => {
            e.preventDefault();
            let name = e.target.name
            let value = e.target.value

            this.setState(prevState => {
                return {
                    ...prevState,
                    category : {
                        ...prevState.category,
                        [name] : value
                    }
                }
            })
        }

        let closeController = (e) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    close : true
                }
            })
        }
    
        // console.log(this.state)

        return (
            <div className='home-dashboard'>
                <Navbar />
                <div className='dashborad-body'>
                    <h2 className='dashborad-body-title'>ویرایش دسته بندی</h2>
                        {   
                            this.state.loading 
                            ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                            : 
                                ! this.state.validation 
                                ?   <>
                                <div className={ this.state.close ? 'closed' : "validErrors" }   >
                                    <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                    {   this.state.messages.map((error)=>{
                                        return (<span>{error}</span>)   
                                        })
                                    }
                                </div>                                                 
                                <form onSubmit={formHandler} className='formContainer'>
                                    <label>نام دسته :
                                        <input type='text' value={ this.state.category.name}  onChange={inputHandler} name='name' placeholder='نام دسته را در اینجا وارد کنید ...'/>
                                    </label>
                                    <label>دسته والد :
                                        <input type='text'   value={this.state.category.parent} onChange={inputHandler} name='parent'/>
                                        <select>

                                        </select>
                                    </label>
                                    <button type='submit' className='button'>افزودن کاربر جدید</button>
                                </form>
                                </>                                
                                :
                            this.state.result 
                            ?
                            
                            <>
                            <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green' , color : 'white' , borderRadius : '5px' ,  marginBottom : '20px'}}>اطلاعات با موفقیت ذخیره شد</span>
                            <form onSubmit={formHandler} className='formContainer'>
                                <label>نام دسته :
                                    <input type='text' value={ this.state.category.name}  onChange={inputHandler} name='name' placeholder='نام دسته را در اینجا وارد کنید ...'/>
                                </label>
                                <label>دسته والد :
                                    <select className='selector' value={this.state.category.parent} onChange={inputHandler} name='parent'>
                                        <option value='none' defaultValue>دسته اصلی</option>
                                        {
                                            this.state.prevParents.map(parent => {
                                                console.log(parent)
                                                return (
                                                    <option value={`${parent._id}`}>{parent.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </label>
                                <button type='submit' className='button'>ویرایش دسته</button>
                            </form>
                            </>
                            :
                            <form onSubmit={formHandler} className='formContainer'>
                                <label>نام دسته :
                                    <input type='text' value={ this.state.category.name}  onChange={inputHandler} name='name' placeholder='نام دسته را در اینجا وارد کنید ...'/>
                                </label>
                                <label>دسته والد :
                                    <select className='selector' value={this.state.category.parent} onChange={inputHandler} name='parent'>
                                        <option value='none' defaultValue>دسته اصلی</option>
                                        {
                                            this.state.prevParents.map(parent => {
                                                // console.log(parent)
                                                return (
                                                    <option key={`${parent._id}`} value={`${parent._id}`}>{parent.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </label>
                                <button type='submit' className='button'>ویرایش دسته</button>
                            </form>
                        }
                </div>
            </div>
            )
    }
}

export default CategoryCreate;