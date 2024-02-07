import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableCategoryRow(props){

    const tableContext =  useContext(TableContext);
    

    let category = props.category
    let deleteHandler = tableContext.deleteHandler

    // console.log(user)
    return (
        <tr>
            <td> {category.name }</td>
            <td>
                
                    {category.parent === null ? 'دسته اصلی' : category.parent.name}
                
            </td>
            <td className='edit-div'>
                
                    <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>                    
                    <div className='edit-piece'>
                        <div className='edit-i'  >
                            <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , category._id ) }/><span >حذف</span>
                        </div>
                        <div className='edit-i' >
                            <Link to={{
                                pathname : `/categories/edit/${category._id}`
                            }}>
                                <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                            </Link>
                        </div>
                    </div>
               
            </td>
        </tr>
    )
}

export default TableCategoryRow;