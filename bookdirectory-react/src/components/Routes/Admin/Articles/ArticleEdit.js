// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 



// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormArticle from '../../../Layouts/Admin/Article/FormArticle'


// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

// Modules
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes)

class ArticleEdit extends React.Component {
    
    state = { 
        article : { 
            title : '',
            statement  : '',
            image : '' ,
            books : '',
            authors : '',
            categories : '',
        } ,
        success : { state : true ,  message : ''},
        categories : [],
        books : [],
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
                
            }
        })
        let param =  this.props.match.params.id
        NodejsApi.get(`/admin/articles/edit/${param}`)
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
                article : response.data.data ,
                categories : response.data.categories,
                param ,
                success : {
                    state : response.data.success ,
                    message : ''
                },
                loading : false
                }
            })

        })
        .catch(err =>  console.log(err))
        NodejsApi.get(`/admin/books`)
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
                books : response.data.data.docs ,
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
            // this.setState(prevState => {
            //     return {
            //         ...prevState,
            //         loading : true
            //     }
            // })
            e.preventDefault();
            let article = this.state.article
            NodejsApi.put(`/admin/articles/${this.state.param}/update` , article)
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
                    article : {
                        ...prevState.article,
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

        let selectHandler = (e) => {
            e.preventDefault();
            let value = e.target.value

            this.setState(prevState => {
                return {
                    ...prevState,
                    article : {
                        ...prevState.article,
                        categories : [
                            ...prevState.article.categories,
                            value
                        ]
                    },
                    books : [
                        ...prevState.article.books,
                        value
                    ]
                }
            })
        }
    
        console.log(this.state)

        return (
            <div className='home-dashboard'>
                <Navbar />
                <div className='dashborad-body'>
                    <h2 className='dashborad-body-title'>ویرایش مقاله</h2>
                        {   
                            this.state.loading 
                            ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                            : 
                                ! this.state.validation 
                                ?   
                                <>
                                    <div className={ this.state.close ? 'closed' : "validErrors" }   >
                                    <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                        {   this.state.messages.map((error)=>{
                                            return (<span key={error}>{error}</span>)   
                                            })
                                        }
                                    </div>                                                 
                                    <FormArticle categories={this.state.categories} books={this.state.books} article={this.state.article}  inputHandler={inputHandler} formHandler={formHandler}  selectHandler={selectHandler}/>
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green' , color : 'white' , borderRadius : '5px' ,  marginBottom : '20px'}}>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormArticle categories={this.state.categories} books={this.state.books} article={this.state.article} inputHandler={inputHandler} formHandler={formHandler} selectHandler={selectHandler} />
                                </>
                            :
                            <FormArticle categories={this.state.categories} books={this.state.books} article={this.state.article} inputHandler={inputHandler} formHandler={formHandler} selectHandler={selectHandler} />
                        }
                </div>
            </div>
            )
    }
}

export default ArticleEdit;