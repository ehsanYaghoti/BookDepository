// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 


// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormArticle from 'src/components/Layouts/Admin/Article/FormArticle';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faTimes)

class ArticleCreate extends React.Component {
    
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
        authors : [],
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
        NodejsApi.get(`/admin/category`)
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
                categories : response.data.data.docs ,
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
        // NodejsApi.get(`/admin/category`)
        // .then(response => {
        //     console.log(response.data)
        //     if(! response.data.success){
        //         return  this.setState(prevState => {
        //            return {
        //             ...prevState,
        //             success : {
        //                 state : response.data.success ,
        //                 message : response.data.data
        //             },
        //             loading : false
        //             }
        //         })
              
        //     }

        //     this.setState(prevState => {
        //         return {
        //         ...prevState,
        //         categories : response.data.data.docs ,
        //         success : {
        //             state : response.data.success ,
        //             message : ''
        //         },
        //         loading : false
        //         }
        //     })

        // })
        // .catch(err =>  console.log(err))
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
            let article = this.state.article
            NodejsApi.post('/admin/articles/create' , article)
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
                        ],
                        books : [
                            ...prevState.article.books,
                            value
                        ]
                    }
                }
            })
        }

        let statementHandler = (e , data) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    article : {
                        ...prevState.article,
                        statement : data
                    }
                }
            })
        }
    
        console.log(this.state)

        return (
            <div className='home-dashboard'>
                <Navbar />
                <div className='dashborad-body'>
                    <h2 className='dashborad-body-title'>افزودن مقاله جدید</h2>
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
                                    <FormArticle categories={this.state.categories} statementHandler={statementHandler} books={this.state.books} article={this.state.article} inputHandler={inputHandler} selectHandler={selectHandler} formHandler={formHandler}  />
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green'}}>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormArticle categories={this.state.categories}statementHandler={statementHandler} books={this.state.books} article={this.state.article} inputHandler={inputHandler} selectHandler={selectHandler} formHandler={formHandler}  />
                                </>
                            :
                            <FormArticle categories={this.state.categories} statementHandler={statementHandler} books={this.state.books} article={this.state.article} inputHandler={inputHandler} selectHandler={selectHandler} formHandler={formHandler}  />
                        }
                </div>
            </div>
            )
    }
}

export default ArticleCreate;