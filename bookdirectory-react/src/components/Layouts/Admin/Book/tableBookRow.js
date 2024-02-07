import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from '../../../../Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableBookRow(props){

    const tableContext =  useContext(TableContext);
    

    let book = props.book
    let deleteHandler = tableContext.deleteHandler

    let categoriesNames = []
    if(book.categories !==  null){
        book.categories.forEach(category => {
            return categoriesNames.push(category.name)
        })
    }

    // console.log(categoriesNames)

    // console.log(user)
    return (
        <tr >
            <td>{book.title }</td>
            <td>{book.author }</td>
            <td className='noWrap' >{book.translator == null ? 'زبان اصلی' : book.translator }</td>
            <td>{book.publisher }</td>
            <td>{book.language }</td>
            <td>{book.price }</td>
            <td style={{display : 'flex' , flexWrap : 'wrap'  , height : 'fit-content'}}>{categoriesNames.map(category => {
                return <div key={category} style={{margin : '5px 0'}}><span key={category} style={{margin : '5px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , whiteSpace : 'nowrap' , color : 'white'}}>{category}</span></div>
            })}</td>

            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , book._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/admin/books/edit/${book._id}`
                        }}>
                            <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableBookRow;