import React , { useState , useEffect } from 'react';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'
import QueryContext from 'src/Contexts/queryContext'
import TableContext from 'src/Contexts/tableContext'

//Components
import Navbar from 'src/components/Layouts/Admin/navbar';
import Pagination from 'src/components/Layouts/Admin/pagination';
import FilterBookRow from 'src/components/Layouts/Admin/Book/filterBookRow';
import TableBook from 'src/components/Layouts/Admin/Book/TableBook';

//import Styles
import  Spinner  from 'react-bootstrap/Spinner';

function Books(props) {

    //States

    const [ books , setBooks ] = useState([])
    const [ queries , setQueries ] = useState({
        name : '',
        limit : '',
        page : '',
        sortBookName : 1,
    })
    const [ pagination , setPagination ] = useState({
        page : 0 ,
        hasNextPage : false ,
        hasPrevPage : false ,
        limit : 10 ,
        nextPage : null ,
        prevPage : null ,
        totalDocs : 0,
        totalPages : 0
    })
      
    const [ loading , setLoading ] = useState(false)
    const [success , setSuccess] = useState({ state : true ,  message : ''})

    //Effects

    useEffect(() => {
        setLoading(true)

        let queryString = Object.keys(queries).map(key => key + '=' + queries[key]).join('&');
        
        NodejsApi.get(`/admin/books?${queryString}`)
        .then(response => {
            if(! response.data.success){
                setLoading(false)
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.data
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })


            let data = response.data.data
            let books = data.docs
            setBooks(books);
            setPagination({
                page : data.page ,
                hasNextPage : data.hasNextPage ,
                hasPrevPage : data.hasPrevPage ,
                limit : data.limit ,
                nextPage : data.nextPage ,
                prevPage : data.prevPage ,
                totalDocs : data.totalDocs,
                totalPages : data.totalPages
            })
        } )
        .catch(err => console.log(err))
        setLoading(false)
    } , [queries])
    
    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`/admin/books` )
        .then(response => {
            if(! response.data.success){
                console.log(response.data)
                setLoading(false)
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.data
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })



            console.log(response.data)
            let data = response.data.data
            let books = data.docs
            setBooks(books);
            setPagination({
                page : data.page ,
                hasNextPage : data.hasNextPage ,
                hasPrevPage : data.hasPrevPage ,
                limit : data.limit ,
                nextPage : data.nextPage ,
                prevPage : data.prevPage ,
                totalDocs : data.totalDocs,
                totalPages : data.totalPages
            })

            setLoading(false);
        } )
        .catch(err => console.log(err))

    } , [])

    //Handlers

    let deleteHandler = (e , id) =>{
        
        NodejsApi.delete(`/admin/books/${id}`)
        .then(response => { 
                setBooks(prevState => {
                return [
                    ...prevState.filter(item => item._id !== id)
                ]
            })  
        })
        .catch(err => console.log(err))
    }

    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setQueries(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })

    }

    let sortHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setQueries(prevState => {
            return {
                ...prevState,
                [name] : -value
            }
        })
    }

    //View

    return (
        <div className='home-dashboard'>
            <Navbar  />
            <div className='dashborad-body'>
                <h2 className='dashborad-body-title'>مدیریت محصولات</h2>
                <QueryContext.Provider value={{  queries , inputHandler }}>
                    <FilterBookRow  />
                    {
                        loading 
                        ? 
                            <div  style={{ textAlign : 'center'}}>                       
                                <Spinner animation="grow"  />
                            </div>
                        : 
                        (
                            ! success.state
                            ? <span style={{ textAlign : 'center'}}>{success.message  || 'مشکلی رخ داده'}</span>
                            :
                            <>
                                <TableContext.Provider value={{ books  , deleteHandler , sortHandler }}>
                                    <TableBook />
                                </TableContext.Provider>
                                <PaginationContext.Provider value={{ pagination  , inputHandler }}>
                                    <Pagination  />
                                </PaginationContext.Provider>
                            </>
                        )
                    }
                </QueryContext.Provider>
            </div>
        </div>
    )

}

export default Books;