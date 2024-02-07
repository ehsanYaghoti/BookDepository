// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormPost from 'src/components/Layouts/Admin/Post/FormPost'

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes)

class PostEdit extends React.Component {
    
    state = { 
        book : { 
            title : '',
            author : '' ,
            translator : '' ,
            statement  : '',
            publisher  : '',
            publicationDate : '' ,
            publicationPlace : '' ,
            ISBN  : '',
            language : '' ,
            dimensions : '' ,
            weight : '' ,
            image : '' ,
            price : '' ,
            discount : '',
            rating : '' ,
            categories : [],
            tags  : ''
        } ,
        param : '',
        success : { state : true ,  message : ''},
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
        let param =  this.props.match.params.id
        NodejsApi.get(`/admin/books/edit/${param}`)
        .then(response => {
            // console.log(response.data)
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
                book : response.data.data ,
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

            let categories = []
            if(this.state.book.categories.length !== 0){
                this.state.book.categories.forEach(category => {
                    if(category.name){
                        return categories.push(category.id)
                    } else if(category.label){
                        return categories.push(category.value)
                    }
                    
                })
            }

            let formData = new FormData()
            formData.append('title' , this.state.book.title)
            formData.append('author' , this.state.book.author)
            formData.append('translator' , this.state.book.translator)
            formData.append('statement' , this.state.book.statement)
            formData.append('publisher' , this.state.book.publisher)
            formData.append('publicationPlace' , this.state.book.publicationPlace)
            formData.append('publicationDate' , this.state.book.publicationDate)
            formData.append('ISBN' , this.state.book.ISBN)
            formData.append('language' , this.state.book.language)
            formData.append('dimensions' , this.state.book.dimensions)
            formData.append('weight' , this.state.book.weight)
            formData.append('categories' , categories)
            formData.append('price' , this.state.book.price)
            formData.append('discount' , this.state.book.discount)
            formData.append('rating' , this.state.book.rating)
            formData.append('tags' , this.state.book.tags)
            formData.append('image' , this.state.book.image)
            console.log(formData)

            NodejsApi.put(`/admin/books/${this.state.param}/update` , formData , {headers : {'content-type' : 'multipart/form-data' }  })
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
                    book : {
                        ...prevState.book,
                        [name] : value
                    }
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
                        book : {
                            ...prevState.book,
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

        let closeController = (e) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    close : true
                }
            })
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
                    book : {
                        ...prevState.book,
                        categories : selectedOption
                    }
                }
            })
        }
        
        let statementHandler = (e , data) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    book : {
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
                    <h2 className='dashborad-body-title'>ویرایش محصول</h2>
                        {   
                            this.state.loading 
                            ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                            : 
                                ! this.state.validation 
                                ?   
                                <>
                                    <div className={ this.state.close ? 'closed' : "validErrors" }   >
                                    <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                        {   
                                            this.state.messages === undefined 
                                            ?
                                                <span>ُServer has a problem</span>
                                            :
                                            this.state.messages.map((error)=>{
                                            return (<span key={error}>{error}</span>)   
                                            })
                                        }
                                    </div>                                                 
                                    <FormPost editMode={true} categories={this.state.categories} statementHandler={statementHandler} book={this.state.book} inputHandler={inputHandler} formHandler={formHandler} imageHandler={imageHandler}  selectHandler={selectHandler}/>
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green' , color : 'white' , borderRadius : '5px' ,  marginBottom : '20px'}}>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormPost editMode={true} categories={this.state.categories} statementHandler={statementHandler} book={this.state.book} inputHandler={inputHandler} formHandler={formHandler} imageHandler={imageHandler} selectHandler={selectHandler} />
                                </>
                            :
                            <FormPost editMode={true} categories={this.state.categories} statementHandler={statementHandler} book={this.state.book} inputHandler={inputHandler} formHandler={formHandler} imageHandler={imageHandler} selectHandler={selectHandler} />
                        }
                </div>
            </div>
            )
    }
}

export default PostEdit;