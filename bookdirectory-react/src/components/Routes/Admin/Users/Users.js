import React , { useState , useEffect } from 'react';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'
import QueryContext from 'src/Contexts/queryContext'
import TableContext from 'src/Contexts/tableContext'

//Components Layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import Pagination from 'src/components/Layouts/Admin/pagination';
import FilterRow from 'src/components/Layouts/Admin/User/filterRow';

import Table from 'src/components/Layouts/Admin/User/Table';

//import Styles
import  Spinner  from 'react-bootstrap/Spinner';

function Users(props) {

    const [ usersState , setUsersState ] = useState([])
    const [ queries , setQueries ] = useState({
        username  : '',
        createdAt : '',
        premission : '',
        limit : '',
        page : '',
        sortCreatedAt : 1,
        sortUsername : 1,
        sortEmail : 1
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
        
        NodejsApi(`/admin/user?${queryString}`)
        .then(response => {
            if(! response.data.success){
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
            let users = data.docs
            setUsersState(users);
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
        .catch(err => {
            console.log(err)
            setLoading(false)
            console.log('there is a problem')
            setSuccess({
                state : false,
                message : err.message
            })
        })
        setLoading(false)
    } , [queries])
    
    console.log('success is' + success.state)

    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`/admin/user` )
        .then(response => {
            if(! response.data.success){
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
            let users = data.docs
            setUsersState(users);
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

    let deleteHandler = (e , bb) =>{
        
        NodejsApi.delete(`/admin/user/${bb}`)
        .then(response => { 
                setUsersState(prevState => {
                return [
                    ...prevState.filter(item => item._id !== bb)
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

    return (
        <div className='home-dashboard'>
            <Navbar  />
            <div className='dashborad-body'>
                <h2 className='dashborad-body-title'>مدیریت کاربران</h2>
                <QueryContext.Provider value={{  queries : queries , inputHandler : inputHandler}}>
                    <FilterRow  />
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
                        <TableContext.Provider value={{users : usersState , deleteHandler , sortHandler}}>
                            <Table />
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

export default Users;