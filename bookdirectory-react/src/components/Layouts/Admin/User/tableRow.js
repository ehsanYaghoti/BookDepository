import React , { useContext } from 'react';
import moment from 'jalali-moment';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync , faUser} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync , faUser)

function TableRow(props){

    const tableContext =  useContext(TableContext);
    

    let user = props.user
    let deleteHandler = tableContext.deleteHandler

    // console.log(user)
    return (
        <tr>
            <td> 
                <div className='user-info'>
                    {
                        user.avatar === null 
                        ?
                        
                        <FontAwesomeIcon icon='user-circle'  style={{margin:'0 20px' , height:'30px' , width:'30px'}} />
                        :
                        <div className='avatar'>
                            <img src={user.avatar}  alt={user.username} /> 
                        </div>
                    }

                    {user.username }
                </div>
            </td>
            <td >
                <div className='table-cell'>
                    {user.email}
                </div>
            </td>
            <td className='premission'>
                <div className={user.admin ? 'admin' : 'viewer'}>
                    {user.admin ? 'admin' : 'viewer'}
                </div>  
            </td>
            <td >
                <div className='table-cell'>
                    {moment(user.createdAt , 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                </div>
            </td>
            <td className='edit-div'>
                <div className='table-cell'>
                    <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                    <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , user._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/users/edit/${user._id}`
                        }}>
                            <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                        </Link>
                    </div>
                </div>
                </div>
            </td>
        </tr>
    )
}

export default TableRow;