//import Modules
import React , { useState , useEffect } from 'react';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'
import QueryContext from 'src/Contexts/queryContext'
import TableContext from 'src/Contexts/tableContext'

//Components
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import Pagination from 'src/components/Layouts/Admin/pagination';
import FilterCommentRow from 'src/components/Layouts/Admin/Comment/filterCommentRow';
import TableComment from 'src/components/Layouts/Admin/Comment/TableComment';

//import Styles
import  Spinner  from 'react-bootstrap/Spinner';

function Books(props) {

    const [ comments , setComments ] = useState([])
    const [ queries , setQueries ] = useState({
        name : '',
        approved : '',
        limit : '',
        page : '',
        sortCommentName : 1,
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


    useEffect(() => {
        setLoading(true)

        let queryString = Object.keys(queries).map(key => key + '=' + queries[key]).join('&');
        
        NodejsApi(`/admin/comments?${queryString}`)
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
            let comments = data.docs
            setComments(comments);
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
        NodejsApi.get(`/admin/comments` )
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
            let comments = data.docs
            setComments(comments);
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

    let deleteHandler = (e , id) =>{
        
        NodejsApi.delete(`/admin/comments/${id}`)
        .then(response => { 
                setComments(prevState => {
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

    let approveHandler = (e , id) =>{
        setLoading(true)
        NodejsApi.put(`/admin/comments/${id}/approve`)
        .then(response => { 
                console.log(response)
                setComments(response.data.data.docs)  
        })
        .catch(err => console.log(err))
        setLoading(false)
    }
    

    return (
        <div className='home-dashboard'>
            <Navbar  />
            <div className='dashborad-body'>
                <h2 className='dashborad-body-title'>مدیریت محصولات</h2>
                <QueryContext.Provider value={{  queries , inputHandler }}>
                    <FilterCommentRow  />
                {
                    loading 
                    ? <div  style={{ textAlign : 'center'}}>                       
                        <Spinner animation="grow"  />
                    </div>  
                    : 
                    (
                        ! success.state
                        ? <span style={{ textAlign : 'center'}}>{success.message  || 'مشکلی رخ داده'}</span>
                        :
                        <>
                        <TableContext.Provider value={{  comments  , deleteHandler , sortHandler , approveHandler }}>
                            <TableComment />
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