// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormPost from 'src/components/Layouts/Admin/Post/FormPost';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss';
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes)

class BookCreate extends React.Component {

    state = { 
        post : { 
            title : '',
            statement  : '<p><strong>توضیح را در اینجا وارد کنید</strong></p>',
            categories : [],
            tags  : []
        } ,
        success : { 
            state : true ,  
            message : ''
        },
        imageInput : {
            file : '',
            previewUrl : ''
        },
        bookCategories : [],
        categories : [],
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
        NodejsApi.get(`/admin/category?limit=100`)
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
    }


    render(){

        let formHandler =  (e) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    loading : true
                }
            })

            e.preventDefault();

            let categories = []
            if(this.state.post.categories.length !== 0){
                this.state.post.categories.forEach(category => {
                    if(category.name){
                        return categories.push(category.id)
                    } else if(category.label){
                        return categories.push(category.value)
                    }
                    
                })
            }

            let formData = new FormData()
            formData.append('title' , this.state.post.title)
            formData.append('author' , this.state.post.author)
            formData.append('translator' , this.state.post.translator)
            formData.append('statement' , this.state.post.statement)
            formData.append('publisher' , this.state.post.publisher)
            formData.append('publicationPlace' , this.state.post.publicationPlace)
            formData.append('publicationDate' , this.state.post.publicationDate)
            formData.append('ISBN' , this.state.post.ISBN)
            formData.append('language' , this.state.post.language)
            formData.append('dimensions' , this.state.post.dimensions)
            formData.append('weight' , this.state.post.weight)
            formData.append('categories' , categories)
            formData.append('price' , this.state.post.price)
            formData.append('discount' , this.state.post.discount)
            formData.append('rating' , this.state.post.rating)
            formData.append('tags' , this.state.post.tags)
            formData.append('image' , this.state.post.image)
            console.log(formData)


            NodejsApi.post('/admin/books/create' , formData , {headers : {'content-type' : 'multipart/form-data' }  })
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
                    post : {
                        ...prevState.post,
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

        let imageHandler = (e) => {
            e.preventDefault();
            // let reader = new FileReader()
            // let file = e.target.files[0]
            console.log(e.target.files[0])

            if (e.target.files && e.target.files[0]) {

                let img = e.target.files[0];
                console.log(img)

                this.setState(prevState => {
                    return {
                        ...prevState,
                        post : {
                            ...prevState.post,
                            image:  img
                            
                        }
                    }
                });
              }
            // reader.onloadend = () => {
            //     this.setState(prevState => {
            //         return {
            //             ...prevState,
            //             imageInput : {
            //                 file,
            //                 previewUrl : reader.result
            //             }
            //         }
            //     })
            //     console.log(this.state)
            // }
            // console.log(reader)

        }

        let selectHandler = selectedOption => {
            const values = []
            selectedOption.map(option => {
               return values.push(option.value)
            })

            console.log(selectedOption)
            console.log(values)

            this.setState(prevState => {
                return {
                    ...prevState,
                    bookCategories : selectedOption,
                    // postCategories : values,
                    post : {
                        ...prevState.post,
                        categories : selectedOption
                    }
                }
            })
        }
        
        let statementHandler = (e , data) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    post : {
                        ...prevState.book,
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
                    <h2 className='dashborad-body-title'>افزودن محصول جدید</h2>
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
                                    <FormPost editMode={false} categories={this.state.categories} statementHandler={statementHandler} selectHandler={selectHandler} book={this.state.book} inputHandler={inputHandler} imageHandler={imageHandler} formHandler={formHandler}  />
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span className='succesSpan'>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormPost editMode={false} categories={this.state.categories} statementHandler={statementHandler} selectHandler={selectHandler} book={this.state.book} inputHandler={inputHandler} imageHandler={imageHandler} formHandler={formHandler}  />
                                    <span className='succesSpan'>اطلاعات با موفقیت ذخیره شد</span>
                                
                                </>
                            :
                            <FormPost editMode={false} categories={this.state.categories} statementHandler={statementHandler} imageInput={this.state.imageInput}  imageHandler={imageHandler} fileInput={this.fileInput} selectHandler={selectHandler} book={this.state.book} inputHandler={inputHandler} formHandler={formHandler}  />
                        }
                </div>
            </div>
            )
    }
}

export default BookCreate;